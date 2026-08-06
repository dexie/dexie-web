// Inline, render-blocking script that applies the correct color scheme
// attribute BEFORE React hydrates and before first paint. This prevents a
// flash-of-wrong-theme (FOWT) when the stored preference (or OS preference)
// differs from the default "dark" scheme baked into the server-rendered HTML.
//
// IMPORTANT: this uses the SAME localStorage key and DOM attribute that
// MUI's own `useColorScheme()` / CssVarsProvider manage internally by
// default (`mui-mode` and `data-mui-color-scheme`). Using a custom key here
// instead would mean MUI's own hydration logic never sees the stored choice
// and silently resets the attribute back to the OS/default preference on
// every mount, undoing the manual toggle after each reload.
//
// Must stay framework-agnostic (no imports) since it is injected as a raw
// <script> tag in the document <head>.
export const COLOR_MODE_STORAGE_KEY = "mui-mode";
export const COLOR_MODE_ATTRIBUTE = "data-mui-color-scheme";

export function getColorModeScript() {
  return `(function() {
    try {
      var key = ${JSON.stringify(COLOR_MODE_STORAGE_KEY)};
      var stored = localStorage.getItem(key);
      var mode = stored === "light" || stored === "dark"
        ? stored
        : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.setAttribute(${JSON.stringify(COLOR_MODE_ATTRIBUTE)}, mode);
      document.documentElement.style.colorScheme = mode;
    } catch (e) {}
  })();`;
}
