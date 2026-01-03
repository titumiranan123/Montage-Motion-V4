export function parseServiceType(
  service_type: string,
  format: "kebab" | "snake" = "kebab"
): string {
  if (!service_type) return "";

  let parsed = service_type;

  // replace - বা _ with space
  if (format === "kebab") {
    parsed = parsed.replace(/-/g, " ");
  } else {
    parsed = parsed.replace(/_/g, " ");
  }

  // capitalize first letter of each word
  parsed = parsed
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return parsed;
}
