export type SiteTheme = "light" | "dark";

export const SITE_THEME_EVENT = "site-theme";

export function getSiteTheme(): SiteTheme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return "light";
}

export function setSiteTheme(theme: SiteTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("site-theme", theme);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(SITE_THEME_EVENT, { detail: { theme } }),
  );
}

export function initSiteTheme() {
  let theme: SiteTheme = "light";
  try {
    const saved = localStorage.getItem("site-theme");
    if (saved === "dark" || saved === "light") theme = saved;
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute("data-theme", theme);
}
