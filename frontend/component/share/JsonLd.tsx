import { serializeJsonLd } from "@/utils/contentSecurity";

type JsonLdProps = {
  value: unknown;
  fallback?: unknown;
};

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MontageMotion",
};

const JsonLd = ({ value, fallback = defaultSchema }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: serializeJsonLd(value, fallback),
    }}
  />
);

export default JsonLd;
