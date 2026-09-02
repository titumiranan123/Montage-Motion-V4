import sanitizeHtml from "sanitize-html";

const richTextOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "address",
    "article",
    "blockquote",
    "br",
    "code",
    "em",
    "figcaption",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "u",
    "ul",
  ],
  allowedAttributes: {
    "*": ["class"],
    a: ["href", "name", "rel", "target"],
    img: ["alt", "height", "loading", "src", "width"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    img: ["http", "https"],
  },
  allowProtocolRelative: false,
};

export const sanitizeRichText = (value: unknown) =>
  typeof value === "string" ? sanitizeHtml(value, richTextOptions) : "";

const escapeJsonForHtml = (value: string) =>
  value
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export const serializeJsonLd = (value: unknown, fallback: unknown) => {
  let normalizedValue = value;

  if (typeof value === "string") {
    try {
      normalizedValue = JSON.parse(value);
    } catch {
      normalizedValue = fallback;
    }
  }

  try {
    return escapeJsonForHtml(JSON.stringify(normalizedValue ?? fallback));
  } catch {
    return escapeJsonForHtml(JSON.stringify(fallback));
  }
};
