/**
 * JSON-LD injector. Escapes HTML-sensitive sequences inside the stringified
 * payload so a stray `</script>` or line/paragraph separators in user-supplied
 * content (reviews, FAQ answers, team bios) cannot break out of the script
 * element.
 */
const U2028 = String.fromCharCode(0x2028);
const U2029 = String.fromCharCode(0x2029);

function safeStringify(data: object | object[]): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .split(U2028).join("\\u2028")
    .split(U2029).join("\\u2029");
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  );
}
