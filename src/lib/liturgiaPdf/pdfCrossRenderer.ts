import type { jsPDF } from "jspdf";
import { LITURGICAL_CROSS } from "@/lib/liturgicalSymbols";

/** Largura reservada no PDF para a cruz de Malta (Helvetica não renderiza U+2720). */
export const CROSS_SLOT_WIDTH_MM = 2.8;

type Segment = { kind: "text"; value: string } | { kind: "cross" };

function parseSegments(line: string): Segment[] {
  const segments: Segment[] = [];
  const parts = line.split(LITURGICAL_CROSS);

  parts.forEach((part, index) => {
    if (part) segments.push({ kind: "text", value: part });
    if (index < parts.length - 1) segments.push({ kind: "cross" });
  });

  return segments;
}

/** Desenha cruz de Malta (U+2720) com traços — equivalente visual no PDF. */
export function drawMalteseCross(
  doc: jsPDF,
  x: number,
  y: number,
  size = 2.4,
) {
  const cx = x + size / 2;
  const midY = y - size * 0.32;
  const top = y - size * 0.78;
  const bottom = y + size * 0.05;

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.22);
  doc.line(cx, top, cx, bottom);
  doc.line(x, midY, x + size, midY);
}

function measureRowWidth(doc: jsPDF, row: Segment[]): number {
  let width = 0;

  for (const segment of row) {
    if (segment.kind === "cross") {
      width += CROSS_SLOT_WIDTH_MM;
    } else {
      width += doc.getTextWidth(segment.value);
    }
  }

  return width;
}

function wrapLineWithCrosses(
  doc: jsPDF,
  line: string,
  maxWidth: number,
): Segment[][] {
  const tokens = parseSegments(line);
  const rows: Segment[][] = [];
  let row: Segment[] = [];
  let rowWidth = 0;

  const pushRow = () => {
    if (row.length > 0) rows.push(row);
    row = [];
    rowWidth = 0;
  };

  for (const token of tokens) {
    if (token.kind === "cross") {
      if (rowWidth + CROSS_SLOT_WIDTH_MM > maxWidth && row.length > 0) {
        pushRow();
      }
      row.push(token);
      rowWidth += CROSS_SLOT_WIDTH_MM;
      continue;
    }

    const words = token.value.split(/(\s+)/);

    for (const word of words) {
      if (!word) continue;
      const wordWidth = doc.getTextWidth(word);

      if (rowWidth + wordWidth > maxWidth && row.length > 0) {
        pushRow();
      }

      const last = row[row.length - 1];
      if (last?.kind === "text") {
        last.value += word;
      } else {
        row.push({ kind: "text", value: word });
      }

      rowWidth += wordWidth;
    }
  }

  if (row.length > 0) rows.push(row);

  return rows.length > 0 ? rows : [[{ kind: "text", value: line }]];
}

function renderSegmentRow(
  doc: jsPDF,
  row: Segment[],
  startX: number,
  y: number,
) {
  let x = startX;

  for (const segment of row) {
    if (segment.kind === "cross") {
      drawMalteseCross(doc, x, y, 2.4);
      x += CROSS_SLOT_WIDTH_MM;
      continue;
    }

    doc.text(segment.value, x, y);
    x += doc.getTextWidth(segment.value);
  }
}

export function textContainsLiturgicalCross(text: string): boolean {
  return text.includes(LITURGICAL_CROSS);
}

export function getWrappedRowCount(
  doc: jsPDF,
  line: string,
  maxWidth: number,
): number {
  return wrapLineWithCrosses(doc, line, maxWidth).length;
}

export function renderWrappedLineWithCrosses(
  doc: jsPDF,
  line: string,
  options: {
    x: number;
    y: number;
    maxWidth: number;
    align?: "left" | "center";
    fontName?: string;
    fontStyle?: "normal" | "bold" | "italic";
    fontSize?: number;
    lineAdvance?: number;
  },
): number {
  const {
    x,
    y,
    maxWidth,
    align = "left",
    fontName = "helvetica",
    fontStyle = "normal",
    fontSize = 9,
    lineAdvance: lineAdvanceOpt,
  } = options;

  doc.setFont(fontName, fontStyle);
  doc.setFontSize(fontSize);

  const rows = wrapLineWithCrosses(doc, line, maxWidth);
  const lineAdvance = lineAdvanceOpt ?? fontSize * 0.38;

  rows.forEach((row, index) => {
    const rowY = y + index * lineAdvance;
    let startX = x;

    if (align === "center") {
      const totalWidth = measureRowWidth(doc, row);
      startX = x + maxWidth / 2 - totalWidth / 2;
    }

    renderSegmentRow(doc, row, startX, rowY);
  });

  return rows.length;
}
