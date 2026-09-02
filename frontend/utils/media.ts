export const FALLBACK_IMAGE = "/assets/montagelogo.png";

export const getSafeImageSrc = (value: unknown) =>
  typeof value === "string" && value.trim() ? value : FALLBACK_IMAGE;

export const getSafeHref = (value: unknown, fallback = "/contact-us") => {
  if (typeof value !== "string") return fallback;

  const href = value.trim();
  if (!href || href === "#" || href === "undefined" || href === "null") {
    return fallback;
  }

  if (href.startsWith("/") || href.startsWith("#")) return href;

  try {
    const protocol = new URL(href).protocol;
    return ["http:", "https:", "mailto:", "tel:"].includes(protocol)
      ? href
      : fallback;
  } catch {
    return fallback;
  }
};
