import type { Leitura, Salmo } from "@/interfaces/liturgiaTypes";
import { normalizeLiturgicalCross } from "@/lib/liturgicalSymbols";

const VERSE_PATTERN = /^(\d+(?:,\d+)?(?:-\d+)?(?:[a-z])?)\s*(.*)/;

export function splitParagraphs(text: string): string[] {
  return text
    .split("\n")
    .map((line) => formatLiturgicalText(line.trim()))
    .filter(Boolean);
}

export function formatReadingIntro(leitura: Leitura): string {
  return formatLiturgicalText(`${leitura.titulo}  ${leitura.referencia}`);
}

export function formatReadingBody(text: string): string[] {
  const lines: string[] = [];

  for (const paragraph of splitParagraphs(text)) {
    const match = paragraph.match(VERSE_PATTERN);
    if (match) {
      const [, numero, resto] = match;
      lines.push(formatLiturgicalText(`${numero} ${resto}`.trim()));
    } else {
      lines.push(formatLiturgicalText(paragraph));
    }
  }

  return lines;
}

export function formatSalmoLines(salmo: Salmo): string[] {
  const refrao = formatLiturgicalText(salmo.refrao);
  const lines: string[] = [`R. ${refrao}`];

  for (const verso of splitParagraphs(salmo.texto)) {
    lines.push(formatLiturgicalText(verso));
    lines.push(`R. ${refrao}`);
  }

  return lines;
}

export function formatEvangelhoTitulo(titulo: string): string {
  return normalizeLiturgicalCross(titulo);
}

export function formatLiturgicalText(text: string): string {
  return normalizeLiturgicalCross(text);
}

export function sanitizeFileName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
