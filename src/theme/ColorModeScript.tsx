// Inline, render-blocking script that applies the correct color scheme
// attribute BEFORE React hydrates and before first paint. This prevents a
// flash-of-wrong-theme (FOWT) when the stored preference (or OS preference)
// differs from the default "dark" scheme baked into the server-rendered HTML.
//
// Must stay framework-agnostic (no imports) since it is injected as a raw
// <script> tag in the document <head>.
export const COLOR_MODE_STORAGE_KEY = "dexie-color-mode";

export function getColorModeScript() {
  return `(function() {
    try {
      var key = ${JSON.stringify(COLOR_MODE_STORAGE_KEY)};
      var stored = localStorage.getItem(key);
      var mode = stored === "light" || stored === "dark"
        ? stored
        : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.setAttribute("data-mui-color-scheme", mode);
      document.documentElement.style.colorScheme = mode;
    } catch (e) {}
  })();`;
}
