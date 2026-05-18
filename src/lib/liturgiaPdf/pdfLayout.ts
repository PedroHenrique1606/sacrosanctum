import type { CorLiturgica } from "@/interfaces/liturgiaTypes";

import type { jsPDF } from "jspdf";

import type { LiturgicalContext } from "./liturgicalContext";

import { format } from "date-fns";

import { ptBR } from "date-fns/locale";

import {

  getLiturgicalColorPalette,

  resetPdfText,

  setPdfDraw,

  setPdfFill,

  setPdfText,

  type LiturgicalColorPalette,

} from "./liturgicalColors";

import {

  getWrappedRowCount,

  renderWrappedLineWithCrosses,

  textContainsLiturgicalCross,

} from "./pdfCrossRenderer";



export const PAGE_WIDTH = 210;

export const PAGE_HEIGHT = 297;

export const MARGIN = 12;

export const MARGIN_TOP_HEADER = 16;

export const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;



export const FONT_BODY = 11;

export const FONT_SMALL = 9;

export const FONT_SECTION = 11;

export const FONT_TITLE = 14;

export const FONT_INSTITUTION = 11;

export const LINE_HEIGHT = 4.6;

export const LINE_HEIGHT_TIGHT = 4.1;



export type PdfContext = {

  doc: jsPDF;

  y: number;

  sectionNumber: number;

  liturgiaTitulo: string;

  pageNumber: number;

  colors: LiturgicalColorPalette;

};



export function createPdfContext(

  doc: jsPDF,

  liturgiaTitulo: string,

  cor: CorLiturgica,

): PdfContext {

  return {

    doc,

    y: MARGIN,

    sectionNumber: 0,

    liturgiaTitulo,

    pageNumber: 1,

    colors: getLiturgicalColorPalette(cor),

  };

}



const PAGE_BOTTOM = PAGE_HEIGHT - MARGIN - 8;



/** Badge «COR: …» alinhado à direita; `anchorX` = borda direita, `baselineY` = linha do texto. */
function drawCorBadge(ctx: PdfContext, anchorX: number, baselineY: number) {
  const { doc, colors } = ctx;
  const label = `COR: ${colors.label}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_SMALL);
  const textWidth = doc.getTextWidth(label);
  const padX = 3;
  const padY = 1.8;
  const boxW = textWidth + padX * 2;
  const boxH = FONT_SMALL * 0.5 + padY * 2;
  const boxX = anchorX - boxW;
  const boxY = baselineY - FONT_SMALL * 0.35 - padY;

  setPdfFill(doc, colors.light);
  setPdfDraw(doc, colors.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(boxX, boxY, boxW, boxH, 1.2, 1.2, "FD");

  setPdfText(doc, colors.text);
  doc.text(label, boxX + padX, baselineY);
  resetPdfText(doc);
}



export function drawRunningHeader(ctx: PdfContext) {

  const { doc, colors } = ctx;



  setPdfDraw(doc, colors.primary);

  doc.setLineWidth(0.35);

  doc.line(MARGIN, MARGIN - 6, PAGE_WIDTH - MARGIN, MARGIN - 6);



  doc.setFont("helvetica", "normal");

  doc.setFontSize(FONT_SMALL);

  setPdfText(doc, colors.primary);

  doc.text(String(ctx.pageNumber), PAGE_WIDTH - MARGIN, MARGIN - 4, {

    align: "right",

  });



  const titulo =

    ctx.liturgiaTitulo.length > 70

      ? `${ctx.liturgiaTitulo.slice(0, 67)}...`

      : ctx.liturgiaTitulo;

  doc.text(titulo, PAGE_WIDTH / 2, MARGIN - 4, { align: "center" });

  resetPdfText(doc);

}



export function ensureSpace(ctx: PdfContext, needed = 14) {

  if (ctx.y + needed <= PAGE_BOTTOM) return;



  ctx.doc.addPage();

  ctx.pageNumber += 1;

  ctx.y = MARGIN_TOP_HEADER;

  drawRunningHeader(ctx);

}



export function writeBannerSection(ctx: PdfContext, titulo: string) {

  ensureSpace(ctx, LINE_HEIGHT * 2.5);

  const { doc, colors } = ctx;

  const h = 7;



  setPdfFill(doc, colors.primary);

  doc.rect(MARGIN, ctx.y - 3.5, 1.4, h, "F");



  setPdfFill(doc, colors.light);

  setPdfDraw(doc, colors.border);

  doc.setLineWidth(0.2);

  doc.rect(MARGIN + 1.4, ctx.y - 3.5, CONTENT_WIDTH - 1.4, h, "FD");



  doc.setFont("helvetica", "bold");

  doc.setFontSize(FONT_SECTION);

  setPdfText(doc, colors.text);

  doc.text(titulo, MARGIN + 4, ctx.y);

  resetPdfText(doc);



  ctx.y += h + 1;

}



export function writeHorizontalRule(ctx: PdfContext) {

  ensureSpace(ctx, 4);

  const { doc, colors } = ctx;

  setPdfDraw(doc, colors.border);

  doc.setLineWidth(0.35);

  doc.line(MARGIN, ctx.y, PAGE_WIDTH - MARGIN, ctx.y);

  ctx.y += 4;

}



export function writeLines(

  ctx: PdfContext,

  lines: string[],

  options?: {

    indent?: number;

    fontSize?: number;

    style?: "normal" | "bold" | "italic";

    lineHeight?: number;

    align?: "left" | "center" | "justify";

    accent?: boolean;

  },

) {

  const indent = options?.indent ?? 0;

  const fontSize = options?.fontSize ?? FONT_BODY;

  const style = options?.style ?? "normal";

  const lh = options?.lineHeight ?? LINE_HEIGHT;

  const align = options?.align ?? "left";

  const useAccent = options?.accent ?? false;



  const maxWidth = CONTENT_WIDTH - indent;

  const baseX = MARGIN + indent;

  const xPos = align === "center" ? PAGE_WIDTH / 2 : baseX;



  ctx.doc.setFont("helvetica", style);

  ctx.doc.setFontSize(fontSize);



  for (const line of lines) {

    if (!line.trim()) continue;



    if (textContainsLiturgicalCross(line)) {

      const rowCount = getWrappedRowCount(ctx.doc, line, maxWidth);

      ensureSpace(ctx, lh * rowCount);



      const renderedRows = renderWrappedLineWithCrosses(ctx.doc, line, {

        x: baseX,

        y: ctx.y,

        maxWidth,

        align: align === "center" ? "center" : "left",

        fontStyle: style,

        fontSize,

        lineAdvance: lh,

      });



      ctx.y += lh * renderedRows;

      continue;

    }



    const wrapped = ctx.doc.splitTextToSize(line, maxWidth);

    for (const part of wrapped) {

      ensureSpace(ctx, lh);

      if (useAccent) setPdfText(ctx.doc, ctx.colors.primary);

      ctx.doc.text(part, xPos, ctx.y, {

        align: align === "center" ? "center" : "left",

      });

      if (useAccent) resetPdfText(ctx.doc);

      ctx.y += lh;

    }

  }

}



export function writeLiturgiaMetadataHeader(
  ctx: PdfContext,
  liturgiaTitulo: string,
  liturgical: LiturgicalContext,
) {
  const { doc, colors } = ctx;
  const dataFormatada = format(liturgical.data, "dd/MM/yyyy", { locale: ptBR });
  const semana =
    liturgical.numeroDomingo !== undefined
      ? `${liturgical.numeroDomingo}º DOMINGO`
      : null;

  const padX = 5;
  const padY = 4;
  const rightX = PAGE_WIDTH - MARGIN - padX;
  const metaBlockY = ctx.y;

  const dateLineH = LINE_HEIGHT * 0.9;
  const domingoLineH = LINE_HEIGHT * 1.05;
  const rowGap = 1.5;
  const anoLineH = LINE_HEIGHT * 0.85;

  const metaBlockH = semana
    ? padY + dateLineH + rowGap + domingoLineH + padY + anoLineH * 0.35
    : padY + dateLineH + padY + anoLineH;

  setPdfFill(doc, colors.light);
  setPdfDraw(doc, colors.border);
  doc.setLineWidth(0.25);
  doc.roundedRect(MARGIN, metaBlockY, CONTENT_WIDTH, metaBlockH, 2, 2, "FD");

  setPdfFill(doc, colors.primary);
  doc.rect(MARGIN, metaBlockY, 2.5, metaBlockH, "F");

  const dateY = metaBlockY + padY + dateLineH * 0.75;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SMALL);
  setPdfText(doc, colors.text);
  doc.text(dataFormatada, MARGIN + padX, dateY);
  drawCorBadge(ctx, rightX, dateY);

  if (semana) {
    const domingoY = dateY + rowGap + domingoLineH * 0.75;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_SECTION);
    doc.text(semana, MARGIN + padX, domingoY);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SMALL);
  const anoY = metaBlockY + metaBlockH - padY;
  doc.text(
    `ANO ${liturgical.anoLiturgico} | ${liturgical.cicloLiturgico}`,
    rightX,
    anoY,
    { align: "right" },
  );
  resetPdfText(doc);

  ctx.y = metaBlockY + metaBlockH + 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_TITLE);
  setPdfText(doc, colors.primary);
  const titleLines = doc.splitTextToSize(
    liturgiaTitulo.toUpperCase(),
    CONTENT_WIDTH - 12,
  );
  for (const line of titleLines) {
    ensureSpace(ctx);
    doc.text(line, PAGE_WIDTH / 2, ctx.y, { align: "center" });
    ctx.y += LINE_HEIGHT + 1.4;
  }

  doc.setFontSize(FONT_SECTION);
  setPdfText(doc, colors.text);
  doc.text("MISSA DO DIA", PAGE_WIDTH / 2, ctx.y, { align: "center" });
  resetPdfText(doc);
  ctx.y += LINE_HEIGHT + 4;

  writeHorizontalRule(ctx);
}



export function applyLiturgicalPageAccents(

  doc: jsPDF,

  colors: LiturgicalColorPalette,

) {

  const total = doc.getNumberOfPages();



  for (let page = 1; page <= total; page++) {

    doc.setPage(page);

    setPdfFill(doc, colors.primary);

    doc.rect(0, 0, 2.2, PAGE_HEIGHT, "F");



    setPdfDraw(doc, colors.border);

    doc.setLineWidth(0.3);

    doc.line(MARGIN, PAGE_HEIGHT - 10, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10);

  }

}



export function addDocumentFooters(

  doc: jsPDF,

  liturgiaTitulo: string,

  colors: LiturgicalColorPalette,

) {

  const total = doc.getNumberOfPages();



  for (let page = 1; page <= total; page++) {

    doc.setPage(page);

    doc.setFont("helvetica", "italic");

    doc.setFontSize(FONT_SMALL - 0.5);

    setPdfText(doc, colors.text);

    doc.text(

      `Sacrosanctum — cor litúrgica: ${colors.label}`,

      PAGE_WIDTH / 2,

      PAGE_HEIGHT - 6,

      { align: "center" },

    );



    if (page === 1) {

      doc.text(

        liturgiaTitulo.length > 60

          ? `${liturgiaTitulo.slice(0, 57)}...`

          : liturgiaTitulo,

        MARGIN + 4,

        PAGE_HEIGHT - 6,

      );

    }



    resetPdfText(doc);

  }



  applyLiturgicalPageAccents(doc, colors);

}


