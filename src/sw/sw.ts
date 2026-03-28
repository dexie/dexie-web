// Offline-first service worker with smart background updates
// Detects updates on hard page loads, caches requested page first, then updates rest in background
// ES modules supported in Chrome 91+, Safari 15+, Firefox 114+ (June 2023)

// Background update service worker
// Check for updates on hard page loads, cache current page first, then update everything else

/// <reference lib="webworker" />

import { MDFullTextMeta } from "@/types/MDFullTextMeta";
import { offlineDB, type OfflineStatus } from "../db/offlineDB";
import type { OfflineManifest } from "@/types/OfflineManifest";

const VERSION = "v3"; // Bumped for simplified approach
const PRECACHE_NAME = `dexie-web-precache-${VERSION}`;
const RUNTIME_NAME = `dexie-web-runtime-${VERSION}`;
const MANIFEST_URL = "/offline-manifest.json";
const ORIGIN = self.location.origin;

// Track last update check to avoid excessive checking
let lastUpdateCheck = 0;
const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

async function updateManifest(): Promise<boolean> {
  // Fetch manifest
  const manifest: OfflineManifest = await fetch(MANIFEST_URL, {
    cache: "no-cache",
    signal: abortController.signal,
  }).then((res) => res.json());

  // Check if manifest is newer than what we have cached
  const storedManifest = await offlineDB.manifest.get("manifest");
  const isManifestNewer =
    !storedManifest || storedManifest.generatedAt !== manifest.generatedAt;
  if (!isManifestNewer) {
    console.log("No manifest changes detected, skipping update.");
    return false;
  }
  console.log("Manifest changes detected, updating cache...");
  await offlineDB.manifest.put(manifest, "manifest");
  return true;
}

// Utility: Update all routes and assets from manifest (simplified approach)
async function updateCacheFromManifest(manifest: OfflineManifest) {
  console.log("Starting cache update from manifest...");
  const cache = await caches.open(RUNTIME_NAME);

  // Get all routes and assets to process
  const allRoutes = manifest.routes;
  const allAssets = Object.keys(manifest.assets);
  const allDocs = Object.keys(manifest.docRoutes);

  // Prioritize order: Routes first, then docs, then critical assets, then other assets
  const criticalAssets = allAssets.filter(
    (a) => a.endsWith(".css") || a.endsWith(".js")
  );
  const otherAssets = allAssets.filter(
    (a) => !a.endsWith(".css") && !a.endsWith(".js")
  );
  const allEntries = [
    ...allRoutes,
    ...allDocs,
    ...criticalAssets,
    ...otherAssets,
  ];
  let updated = 0;
  let index = 0;
  const concurrency = 4;

  async function worker() {
    while (index < allEntries.length) {
      const entry = allEntries[index++];
      const isAsset = allAssets.includes(entry);
      const isDoc = allDocs.includes(entry);
      const expectedHash = isAsset
        ? manifest.assets[entry]
        : isDoc
        ? manifest.docRoutes[entry]
        : null;

      try {
        // For assets, check if hash has changed
        // For woff files, skip updating
        // For routes, always update since we don't track route hashes anymore
        let shouldUpdate = true;

        if (expectedHash) {
          const currentMeta = await offlineDB.cacheMetadata.get(entry);
          shouldUpdate = !currentMeta || currentMeta.hash !== expectedHash;
        }

        if (shouldUpdate) {
          const req = new Request(new URL(entry, ORIGIN).toString(), {
            credentials: "same-origin",
            cache: "no-cache",
          });

          const resp = await fetch(req, { signal: abortController.signal });

          if (resp.ok) {
            const respClone = resp.clone();
            console.log(
              `caching URL: ${entry}. Content-Type: ${resp.headers.get(
                "Content-Type"
              )}`
            );
            await cache.put(req, respClone);
            await offlineDB.cacheMetadata.upsert(entry, {
              hash: expectedHash,
              lastUpdated: new Date().toISOString(),
            });
            updated++;
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new DOMException(
            "Update aborted due to fetch event",
            "AbortError"
          );
        } else {
          console.warn(`Failed to update ${entry}:`, error);
        }
      }
    }
  }

  // Process all entries
  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  console.log(`Cache update complete: ${updated} updated entries.`);
}

// Utility: Save offline cache status to Dexie for GUI consumption
async function saveOfflineStatus(status: Partial<OfflineStatus>) {
  try {
    await offlineDB.status.put({
      id: "cache",
      isWarming: false,
      isReady: false,
      ...status,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    // Fallback to message if Dexie access fails
    self.clients
      .matchAll({ includeUncontrolled: true })
      .then((clients: readonly Client[]) => {
        clients.forEach((client: Client) =>
          client.postMessage({ type: "OFFLINE_STATUS", ...status })
        );
      });
  }
}

self.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === "RESUME_CACHING") {
    event.waitUntil(stateMachine());
  }
});

self.addEventListener("install", (event: ExtendableEvent) => {
  // Activate immediately
  event.waitUntil(self.skipWaiting());
  event.waitUntil(
    (async () => {
      // Clean old precaches
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n !== PRECACHE_NAME && n !== RUNTIME_NAME)
          .map((n) => caches.delete(n))
      );

      // Pre-cache a minimal offline shell
      const precache = await caches.open(PRECACHE_NAME);
      await precache.addAll(
        [
          "/",
          "/docs",
          "/favicon.ico",
          "/assets/images/og-images/og-base.png",
        ].map((u) => new Request(u, { credentials: "same-origin" }))
      );
    })()
  );
});

async function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function oneAtATime<T extends () => Promise<R>, R>(fn: T) {
  let running: Promise<R> | null = null;

  return (): Promise<R> => {
    if (!running) {
      running = fn().finally(() => {
        running = null;
      });
    }

    return running as Promise<R>;
  };
}

let abortController = new AbortController();

function pauseStateMachine(event: ExtendableEvent) {
  abortController.abort();
  abortController = new AbortController();
  event.waitUntil(
    sleepAndRestartStateMachine().catch(()=>{}) // errors are logged in sleepAndRestartStateMachine
  );

  async function sleepAndRestartStateMachine() {
    await sleep(5000, abortController.signal); // Don't log if sleep is aborted (too much noise)
    await stateMachine().catch((error) => {
      if (error?.name === "AbortError") {
        console.log("State machine aborted");
      } else {
        console.warn("State machine error:", error);
      }
      return Promise.reject(error);
    });
  }
}

const stateMachine = oneAtATime(async () => {
  let state = await offlineDB.state.get("state");
  if (
    state === "idle" &&
    lastUpdateCheck < Date.now() - UPDATE_CHECK_INTERVAL
  ) {
    state = "check";
    await offlineDB.state.put(state, "state");
  }
  while (state && state !== "idle") {
    checkAbort();
    switch (state) {
      case "check": {
        console.log("State machine: Checking for updates...");
        const updated = await updateManifest();
        if (updated) {
          // If updated, set state to updating-fts
          state = "updating-fts";
          await offlineDB.state.put(state, "state");
        } else {
          // No updates, go idle
          state = "idle";
          await offlineDB.state.put(state, "state");
        }
        lastUpdateCheck = Date.now();
        break;
      }

      case "updating-fts": {
        console.log("State machine: Updating full-text search index...");
        await updateFTS();
        state = "updating-cache";
        await offlineDB.state.put(state, "state");
        await sleep(5000, abortController.signal); // Small delay before next step
        break;
      }

      case "updating-cache": {
        console.log("State machine: Updating cache from manifest...");
        const manifest = await offlineDB.manifest.get("manifest");
        if (manifest) {
          await updateCacheFromManifest(manifest);
        }
        state = "idle";
        await offlineDB.state.put(state, "state");
        break;
      }
    }
  }
});

function checkAbort() {
  if (abortController.signal.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
}

async function updateFTS() {
  let manifest = await offlineDB.manifest.get("manifest");
  if (!manifest) {
    await updateManifest();
    manifest = await offlineDB.manifest.get("manifest");
  }
  if (!manifest) throw new Error("No manifest available for FTS update");

  const cachedDocRoutes = await offlineDB.cacheMetadata
    .where("id")
    .startsWith("/docs/")
    .toArray();
  const cachedDocByUrl = new Map<string, { id: string; hash: string | null }>();
  for (const doc of cachedDocRoutes) {
    cachedDocByUrl.set(doc.id, { id: doc.id, hash: doc.ftsHash || null });
  }
  const manifestDocRoutes = Object.keys(manifest.docRoutes);
  const docsToUpsert = manifestDocRoutes.filter((docRoute) => {
    const cached = cachedDocByUrl.get(docRoute);
    return !cached || cached.hash !== manifest.docRoutes[docRoute];
  });

  async function worker() {
    while (docsToUpsert.length > 0) {
      checkAbort();
      const docUrl = docsToUpsert.pop();
      if (docUrl) {
        try {
          await putFullTextIndex(docUrl);
          // Update cache metadata
          await offlineDB.cacheMetadata.upsert(docUrl, {
            ftsHash: manifest!.docRoutes[docUrl],
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            throw new DOMException("Aborted", "AbortError");
          } else {
            console.warn(
              `Failed to update full-text index for ${docUrl}:`,
              error
            );
            throw error;
          }
        }
      }
    }
  }
  const concurrency = 8;
  console.log("Starting FTS update workers...", docsToUpsert.length, "docs to process.");
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log("FTS update workers complete.");

  // Delete docs that are no longer in manifest
  const docsToDelete = cachedDocRoutes.filter(
    (doc) => !manifestDocRoutes.includes(doc.id)
  );
  for (const doc of docsToDelete) {
    console.log("Deleting obsolete FTS doc:", doc.id);
    await offlineDB.deleteFullTextDoc(doc.id);
    await offlineDB.cacheMetadata.delete(doc.id);
  }
  console.log("FTS indexing complete.");
}

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      // Take control immediately
      await self.clients.claim();
      // Set initial state to "check"
      await offlineDB.state.put("check", "state");
      // Try starting the state machine (but don't wait for it!)
      stateMachine().catch((error) => {
        if (error?.name === "AbortError") {
          console.log("State machine aborted");
        } else {
          console.warn("State machine error:", error);
        }
      });
    })()
  );

  // Listen for online/offline events to optimize behavior
  self.addEventListener("online", () => {
    console.log("📶 Back online - enabling background updates");
  });

  self.addEventListener("offline", () => {
    console.log("📵 Gone offline - disabling background updates");
  });
});

// Cache strategies
function isSameOrigin(req: Request) {
  try {
    const url = new URL(req.url);
    return url.origin === ORIGIN;
  } catch {
    return false;
  }
}

// Utility: Check if we're likely online
function isLikelyOnline(): boolean {
  // Use navigator.onLine if available, but it's not always reliable
  return "onLine" in navigator ? navigator.onLine : true;
}

async function fetchWithTimeout(
  request: Request,
  timeout: number,
  requestInit: RequestInit = {}
): Promise<Response | null> {
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), timeout);
  const res = await fetch(request, {
    signal: abortController.signal,
    ...requestInit,
  }).catch(() => null);
  clearTimeout(timer);
  return res;
}

async function rscCheck(event: FetchEvent) {
  const cache = await caches.open(RUNTIME_NAME);
  const request = event.request;
  console.log("RSC check for:", request.url);

  // Remove hash and search params to match how we cache in manifest
  const url = new URL(request.url);
  url.hash = "";
  url.searchParams.delete("search");
  url.searchParams.delete("_rsc");
  const cleanUrl = url.toString();

  // Try to find cached version - try multiple variations
  const cached = await cache.match(cleanUrl);

  if (cached) {
    const res = await fetchWithTimeout(request, 1000);
    if (res && res.ok) {
      return res;
    }
    console.log(
      "Network failed or too slow, returning 204 to force loading doc:",
      request.url
    );
    return new Response(null, {
      status: 204,
    });
  }
  return fetch(request);
}

async function cacheFirst(
  event: FetchEvent,
  { ignoreQuery = true } = {}
): Promise<Response> {
  const cache = await caches.open(RUNTIME_NAME);
  const request = event.request;

  // Only do network-first for actual user navigation (NOT prefetch/RSC)
  const isUserNavigation =
    request.mode === "navigate" &&
    request.destination === "document" &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_rsc=") && // Next.js React Server Components (prefetch)
    ["no-store", "no-cache", "reload"].includes(request.cache);

  // For USER navigation requests only, try network-first
  if (isUserNavigation && isLikelyOnline()) {
    try {
      pauseStateMachine(event);
      const resp = await fetchWithTimeout(request, 3000, {
        cache: "no-cache",
      });
      if (resp && resp.ok) {
        await cache.put(request, resp.clone());
        console.log("Network-first served:", request.clone());

        const triggerStateMachine = async () => {
          // Set state machine to check for updates on next opportunity
          const shouldUpdate = await offlineDB.transaction(
            "rw",
            offlineDB.state,
            async () => {
              const currentState = await offlineDB.state.get("state");
              if (currentState === "idle") {
                await offlineDB.state.put("check", "state");
                return true;
              }
              return false;
            }
          );
          if (shouldUpdate) {
            // Fire off state machine without blocking response
            await stateMachine().catch((error) => {
              if (error?.name === "AbortError") {
                console.log("State machine aborted");
              } else {
                console.warn("State machine error:", error);
              }
            });
          }
        };

        event.waitUntil(triggerStateMachine());

        return resp;
      }
    } catch {
      console.log("Network failed, falling back to cache for:", request.url);
    }
  }

  const canonicalUrl = ignoreQuery ? request.url.split("?")[0] : request.url;

  // For ALL other requests (prefetch, assets, etc.), use cache-first
  let cached = await cache.match(canonicalUrl);

  // If not found and this is a docs route, try case-insensitive variants
  if (!cached && canonicalUrl.startsWith(`${ORIGIN}/docs/`)) {
    const url = new URL(canonicalUrl);
    const pathname = url.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length >= 2) {
      // ['docs', 'something', ...]
      const docPath = pathSegments.slice(1).join("/"); // remove 'docs'

      // Try variations for potential index routes and case variants
      const variations = [
        pathname, // original path like /docs/tutorial
        pathname + "/index", // try explicit index like /docs/tutorial/index
        "/docs/" + docPath.charAt(0).toUpperCase() + docPath.slice(1), // capitalize first letter
        "/docs/" +
          docPath.charAt(0).toUpperCase() +
          docPath.slice(1) +
          "/index",
      ];

      for (const variant of variations) {
        const variantUrl = new URL(variant, ORIGIN).toString();
        cached = await cache.match(variantUrl);
        if (cached) {
          console.log(
            `Cache: Found variant: ${variant} for request ${pathname}`
          );
          break;
        }
      }
    }
  }

  if (cached) {
    console.log("Cache-first served:", request.url.split("/").pop());
    return cached;
  }

  pauseStateMachine(event);

  if (isLikelyOnline()) {
    try {
      /*const controller = new AbortController();
      // Shorter timeout for RSC requests to avoid blocking scrolling
      const timeout = isRSCRequest ? 1000 : 5000; // 1s for RSC, 5s for others
      const timeoutId = setTimeout(() => controller.abort(), timeout);*/
      const canonicalRequest = ignoreQuery
        ? new Request(canonicalUrl, {
            method: request.method,
            headers: request.headers,
            credentials: request.credentials,
            redirect: request.redirect,
          })
        : request;

      const resp = await fetch(canonicalRequest);
      //clearTimeout(timeoutId);

      if (resp && resp.ok && request.method === "GET") {
        await cache.put(canonicalRequest, resp.clone());
        console.log(
          "Network fallback served:",
          request.url.split("?")[0].split("/").pop()
        );
      }
      return resp;
    } catch (err) {
      console.log("Network failed for:", request.url, err);
    }
  }

  // Final fallback for navigation
  if (request.mode === "navigate") {
    const shell = await caches.open(PRECACHE_NAME).then((c) => c.match("/"));
    if (shell) {
      return shell;
    }
  }

  throw new Error("Unable to serve request offline");
}

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== "GET" || !isSameOrigin(request)) {
    pauseStateMachine(event);
    return; // allow default network
  }
  if (url.searchParams.get("_rsc")) {
    // Handling of _rsc requests: They are unnescessary in case
    // we have the full document cached already.
    pauseStateMachine(event);
    event.respondWith(rscCheck(event));
    return;
  }

  // All same-origin requests use cache-first strategy
  // Our smart cache update system handles keeping content fresh
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/favicon") ||
    request.mode === "navigate" ||
    url.pathname.startsWith("/docs") ||
    url.pathname === "/" ||
    url.pathname.startsWith("/product") ||
    url.pathname.startsWith("/pricing") ||
    url.pathname.startsWith("/contact") ||
    url.pathname.startsWith("/privacy") ||
    url.pathname.startsWith("/terms")
  ) {
    event.respondWith(cacheFirst(event));
    return;
  }
  if (url.pathname.startsWith("/blog/")) {
    event.respondWith(cacheFirst(event, { ignoreQuery: false }));
    return;
  }

  // API routes and other dynamic content - network first
  if (url.pathname.startsWith("/api/")) {
    pauseStateMachine(event);
    event.respondWith(
      fetch(event.request).catch(
        () =>
          new Response('{"error":"API unavailable offline"}', {
            headers: { "Content-Type": "application/json" },
          })
      )
    );
    return;
  }

  // External resources - cache first for offline support
  if (
    url.hostname === "api.github.com" &&
    (url.pathname.includes("/repos/dexie/Dexie.js") ||
      url.pathname.includes("/repos/dexie/"))
  ) {
    event.respondWith(cacheFirst(event));
    return;
  }

  if (url.hostname === "cdn-images-1.medium.com") {
    event.respondWith(cacheFirst(event));
    return;
  }

  if (
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "ssl.gstatic.com" ||
    url.hostname === "www.gstatic.com"
  ) {
    event.respondWith(cacheFirst(event));
    return;
  }

  if (url.hostname === "lh3.googleusercontent.com") {
    event.respondWith(cacheFirst(event));
    return;
  }

  if (url.hostname === "ogs.google.com") {
    event.respondWith(cacheFirst(event));
    return;
  }

  // Fallback: cache-first for anything else
  event.respondWith(cacheFirst(event, { ignoreQuery: false }));
});

// Message handler: clear cache
self.addEventListener("message", (event: ExtendableMessageEvent) => {
  const type = event.data && event.data.type;
  if (type === "CLEAR_CACHE") {
    event.waitUntil(
      caches
        .keys()
        .then((names) => Promise.all(names.map((n) => caches.delete(n))))
        .then(async () => {
          // Reset offline status
          await saveOfflineStatus({
            isWarming: false,
            isReady: false,
            cached: 0,
            total: 0,
          });

          // Clear metadata
          await offlineDB.cacheMetadata.clear();

          // Notify clients that cache was cleared
          self.clients
            .matchAll({ includeUncontrolled: true })
            .then((clients: readonly Client[]) => {
              clients.forEach((client: Client) =>
                client.postMessage({ type: "CACHE_CLEARED" })
              );
            });
        })
    );
  } else if (type === "SKIP_WAITING") {
    // Allow clients to force service worker update
    self.skipWaiting();
  }
});

async function putFullTextIndex(route: string) {
  const req = new Request(`/full-text-search${route}.json`, {
    credentials: "same-origin",
  });
  const resp = await fetch(req, { cache: "no-cache" }); // So small file, don't abortSignal it
  if (resp.ok) {
    const ftMeta = (await resp.json()) as MDFullTextMeta;
    // Store in IndexedDB via Dexie
    for (const section of ftMeta.sections) {
      const url = section.slug ? `${route}#${section.slug}` : route;
      const title = section.slug ? section.title : ftMeta.title || route;
      const parentTitle = ftMeta.title || undefined;
      await offlineDB.putFullTextDoc(
        url,
        title,
        section.content,
        parentTitle
      );
    }
  } else if (resp.status === 404) {
    console.log("State machine: 404 on FTS data for route:", route);
    // No full text index available for this route
    await offlineDB.deleteFullTextDoc(route);
  } else {
    throw new Error(
      `Failed to fetch full-text index for ${route}: ${resp.statusText}`
    );
  }
}

// TypeScript globals for service worker
declare const self: ServiceWorkerGlobalScope & typeof globalThis;
export {};
