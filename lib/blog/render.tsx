import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Minimal markdown renderer for the blog. Supports the subset used in
 * lib/blog/articles.ts:
 *   - H2 headings (## Heading)
 *   - paragraphs
 *   - bullet lists (- item) and numbered lists (1. item)
 *   - inline links [text](url) — internal vs external auto-detect
 *   - inline bold (**text**) and italics (*text*)
 *
 * Keeping this dependency-free avoids pulling remark/rehype into the
 * bundle. Source markdown is author-controlled so we don't need to
 * worry about malicious input.
 */

type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    // Paragraph: consume until blank line
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("## ") && !lines[i].startsWith("- ") && !/^\d+\.\s+/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", text: buf.join(" ") });
  }

  return blocks;
}

/**
 * Render an inline-formatted string into React nodes. Handles **bold**,
 * *italic*, and [text](url) links. Order of operations matters — we
 * tokenize, then render each token.
 */
type Token =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "link"; text: string; href: string };

function tokenizeInline(input: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  // Combined regex: link | bold | italic
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > cursor) {
      tokens.push({ kind: "text", value: input.slice(cursor, match.index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ kind: "link", text: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      tokens.push({ kind: "bold", value: match[3] });
    } else if (match[4] !== undefined) {
      tokens.push({ kind: "italic", value: match[4] });
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < input.length) {
    tokens.push({ kind: "text", value: input.slice(cursor) });
  }
  return tokens;
}

function renderInline(input: string, keyPrefix: string): ReactNode {
  const tokens = tokenizeInline(input);
  return tokens.map((tok, i) => {
    const key = `${keyPrefix}-${i}`;
    if (tok.kind === "text") return <span key={key}>{tok.value}</span>;
    if (tok.kind === "bold") return <strong key={key}>{tok.value}</strong>;
    if (tok.kind === "italic") return <em key={key}>{tok.value}</em>;
    // link
    const isInternal = tok.href.startsWith("/");
    if (isInternal) {
      return (
        <Link key={key} href={tok.href} className="text-brand underline-offset-4 hover:underline">
          {tok.text}
        </Link>
      );
    }
    const isTel = tok.href.startsWith("tel:");
    return (
      <a
        key={key}
        href={tok.href}
        className="text-brand underline-offset-4 hover:underline"
        {...(isTel ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {tok.text}
      </a>
    );
  });
}

export function renderMarkdown(markdown: string): ReactNode {
  const blocks = parseBlocks(markdown);
  return blocks.map((block, idx) => {
    const key = `b-${idx}`;
    if (block.kind === "h2") {
      const id = block.text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return (
        <h2
          key={key}
          id={id}
          className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {renderInline(block.text, key)}
        </h2>
      );
    }
    if (block.kind === "p") {
      return (
        <p key={key} className="mt-6 text-base leading-7 text-foreground/85 sm:text-[17px] sm:leading-[1.8]">
          {renderInline(block.text, key)}
        </p>
      );
    }
    if (block.kind === "ul") {
      return (
        <ul key={key} className="mt-6 list-disc space-y-2 pl-6 text-base leading-7 text-foreground/85 sm:text-[17px] sm:leading-[1.8]">
          {block.items.map((it, i) => (
            <li key={`${key}-i${i}`}>{renderInline(it, `${key}-i${i}`)}</li>
          ))}
        </ul>
      );
    }
    return (
      <ol key={key} className="mt-6 list-decimal space-y-2 pl-6 text-base leading-7 text-foreground/85 sm:text-[17px] sm:leading-[1.8]">
        {block.items.map((it, i) => (
          <li key={`${key}-i${i}`}>{renderInline(it, `${key}-i${i}`)}</li>
        ))}
      </ol>
    );
  });
}

/** Strips markdown for an excerpt / og:description fallback. */
export function plaintextExcerpt(markdown: string, maxLen = 200): string {
  const stripped = markdown
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((l) => !l.startsWith("## "))
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen - 1).trimEnd() + "…";
}
