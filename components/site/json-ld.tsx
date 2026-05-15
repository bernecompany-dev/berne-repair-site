export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify safely escapes; we intentionally inject as raw script per schema.org spec.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
