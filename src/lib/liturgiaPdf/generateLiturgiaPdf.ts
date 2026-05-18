import type { LiturgiaDiaResponse } from "@/interfaces/liturgiaTypes";
import {
  ANTIFONA_DE_COMUNHAO,
  ORACAO_DEPOIS_DA_COMUNHAO,
} from "@/lib/liturgiaLabels";
import paxVobisBanner from "@/assets/REMOVEDPAXVOBIS.png";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import {
  formatEvangelhoTitulo,
  formatReadingBody,
  formatReadingIntro,
  formatSalmoLines,
  sanitizeFileName,
  splitParagraphs,
} from "./formatters";
import {
  resetPdfText,
  setPdfFill,
  setPdfText,
} from "./liturgicalColors";
import {
  addDocumentFooters,
  createPdfContext,
  drawRunningHeader,
  ensureSpace,
  FONT_INSTITUTION,
  FONT_SMALL,
  LINE_HEIGHT,
  CONTENT_WIDTH,
  MARGIN,
  writeBannerSection,
  writeHorizontalRule,
  writeLines,
  writeLiturgiaMetadataHeader,
  type PdfContext,
} from "./pdfLayout";
import {
  getLiturgicalContextForPdf,
  selecionarOracaoEucaristica,
} from "./selectOracaoEucaristica";
import {
  personagemParaMissal,
  resolverTextoOracaoEucaristica,
  type LinhaOracaoPdf,
} from "./resolveOracaoEucaristicaText";

async function loadImageDataUrl(src: string): Promise<{
  dataUrl: string;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Não foi possível processar a imagem do cabeçalho."));
        return;
      }
      ctx.drawImage(image, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL("image/png"),
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
    image.onerror = () =>
      reject(new Error("Não foi possível carregar a imagem do cabeçalho."));
    image.src = src;
  });
}

function writeSectionTitle(
  ctx: PdfContext,
  title: string,
  reference?: string,
) {
  ctx.sectionNumber += 1;
  const label = `${ctx.sectionNumber}. ${title}`;
  const suffix = reference ? `        (${reference})` : "";

  ensureSpace(ctx, LINE_HEIGHT * 2);
  const { doc, colors } = ctx;
  const header = `${label}${suffix}`;
  const wrapped = doc.splitTextToSize(header, CONTENT_WIDTH - 4);
  const barHeight = Math.max(
    LINE_HEIGHT + 0.4,
    wrapped.length * (LINE_HEIGHT + 0.4),
  );

  setPdfFill(doc, colors.primary);
  doc.rect(MARGIN, ctx.y - 3, 1.2, barHeight, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setPdfText(doc, colors.text);

  for (const part of wrapped) {
    doc.text(part, MARGIN + 3.5, ctx.y);
    ctx.y += LINE_HEIGHT + 0.4;
  }

  resetPdfText(doc);
  ctx.y += 1;
}

function writePrayer(ctx: PdfContext, title: string, text: string) {
  writeSectionTitle(ctx, title.toUpperCase());
  writeLines(ctx, ["P. Oremos. (silêncio)"]);
  writeLines(ctx, splitParagraphs(text));
  writeLines(ctx, ["T. Amém."], { style: "bold" });
  ctx.y += 2;
}

function writeReadingBlock(
  ctx: PdfContext,
  title: string,
  leitura: { referencia: string; titulo: string; texto: string },
  optionLabel?: string,
) {
  if (optionLabel) {
    writeLines(ctx, [optionLabel], { fontSize: FONT_SMALL, style: "italic" });
  }

  writeSectionTitle(ctx, title, leitura.referencia);
  writeLines(ctx, [formatReadingIntro(leitura)], { style: "italic" });
  writeLines(ctx, formatReadingBody(leitura.texto));
  writeLines(ctx, ["— Palavra do Senhor."], { style: "bold", accent: true });
  writeLines(ctx, ["T. Graças a Deus."]);
  ctx.y += 2;
}

function writeSalmoBlock(
  ctx: PdfContext,
  salmo: { referencia: string; refrao: string; texto: string },
  optionLabel?: string,
) {
  if (optionLabel) {
    writeLines(ctx, [optionLabel], { fontSize: FONT_SMALL, style: "italic" });
  }

  writeSectionTitle(ctx, "SALMO", salmo.referencia);
  for (const line of formatSalmoLines(salmo)) {
    writeLines(ctx, [line], {
      accent: line.startsWith("R. "),
      indent: line.startsWith("R. ") ? 2 : 0,
    });
  }
  ctx.y += 2;
}

function writeEvangelhoBlock(
  ctx: PdfContext,
  evangelho: { referencia: string; titulo: string; texto: string },
  optionLabel?: string,
) {
  const isPaixao = evangelho.titulo.startsWith(
    "Paixão de nosso Senhor Jesus Cristo",
  );

  if (optionLabel) {
    writeLines(ctx, [optionLabel], { fontSize: FONT_SMALL, style: "italic" });
  }

  writeSectionTitle(ctx, "EVANGELHO", evangelho.referencia);
  writeLines(ctx, [formatEvangelhoTitulo(evangelho.titulo)], {
    style: "italic",
  });

  if (!isPaixao) {
    writeLines(ctx, [
      "P. O Senhor esteja convosco.",
      "T. Ele está no meio de nós.",
    ]);
    const proclamacao = formatEvangelhoTitulo(evangelho.titulo);
    writeLines(ctx, [
      proclamacao.match(/^proclamação|^evangelho|^conclusão/i)
        ? `P. ${proclamacao}.`
        : `P. Proclamação do Evangelho de Jesus Cristo ${proclamacao}.`,
    ]);
    writeLines(ctx, ["T. Glória a vós, Senhor."]);
  }

  writeLines(ctx, formatReadingBody(evangelho.texto));
  writeLines(ctx, ["— Palavra da Salvação."], { style: "bold", accent: true });
  writeLines(ctx, ["T. Glória a vós, Senhor."]);
  ctx.y += 2;
}

function writeOptionsNote(ctx: PdfContext, count: number, tipo: string) {
  if (count <= 1) return;
  writeLines(
    ctx,
    [
      `Há ${count} opções de ${tipo}. O celebrante escolhe uma delas, conforme o Missal Romano.`,
    ],
    { fontSize: FONT_SMALL, style: "italic", indent: 4 },
  );
  ctx.y += 1;
}

function writeOracaoEucaristicaLinha(
  ctx: PdfContext,
  linha: LinhaOracaoPdf,
) {
  switch (linha.tipo) {
    case "rubrica":
      writeLines(ctx, [linha.texto], {
        fontSize: FONT_SMALL,
        style: "italic",
        indent: 4,
        lineHeight: LINE_HEIGHT - 0.3,
      });
      break;
    case "dialogo":
      writeLines(
        ctx,
        [`${personagemParaMissal(linha.personagem)} ${linha.texto}`],
        { indent: 2 },
      );
      break;
    case "instituicao":
      writeLines(ctx, [linha.texto], {
        style: "bold",
        align: "center",
        fontSize: FONT_INSTITUTION,
        lineHeight: LINE_HEIGHT + 0.3,
      });
      ctx.y += 1;
      break;
    case "alternativa":
      writeLines(ctx, [linha.texto], {
        fontSize: FONT_SMALL,
        style: "italic",
        indent: 6,
      });
      break;
    case "texto":
      writeLines(ctx, [linha.texto], { indent: 2 });
      break;
  }
}

function writeOracaoEucaristica(
  ctx: PdfContext,
  data: LiturgiaDiaResponse,
  selectedDate: Date,
) {
  const liturgical = getLiturgicalContextForPdf(
    data.liturgia,
    selectedDate,
    data.cor,
  );
  const selecao = selecionarOracaoEucaristica(
    data.liturgia,
    selectedDate,
    data.cor,
  );
  const { linhas, variacoesAplicadas } = resolverTextoOracaoEucaristica(
    selecao.oracao,
    liturgical,
  );

  const tituloOracao = selecao.oracao.titulo.replace(/^Oração Eucarística\s*/i, "");
  writeSectionTitle(
    ctx,
    `ORAÇÃO EUCARÍSTICA — ${tituloOracao.toUpperCase()}`,
  );

  writeLines(
    ctx,
    [
      `Sugestão do Sacrosanctum: ${selecao.justificativa}`,
      selecao.observacaoCelebrante,
    ],
    { fontSize: FONT_SMALL, style: "italic", indent: 4 },
  );

  if (variacoesAplicadas.length > 0) {
    writeLines(
      ctx,
      [`Inserções aplicadas: ${variacoesAplicadas.join("; ")}.`],
      { fontSize: FONT_SMALL, style: "italic", indent: 4 },
    );
  }

  if (selecao.oracao.edicao) {
    writeLines(ctx, [selecao.oracao.edicao], {
      fontSize: FONT_SMALL,
      indent: 4,
    });
  }

  ctx.y += 2;

  for (const linha of linhas) {
    writeOracaoEucaristicaLinha(ctx, linha);
  }

  ctx.y += 2;
}

export async function generateLiturgiaPdf(
  data: LiturgiaDiaResponse,
  selectedDate: Date,
): Promise<void> {
  if (data.liturgia === "Sábado Santo - Vigília Pascal") {
    throw new Error("O PDF da Vigília Pascal ainda não está disponível.");
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ctx = createPdfContext(doc, data.liturgia, data.cor);

  const { dataUrl, width, height } = await loadImageDataUrl(paxVobisBanner);
  const maxBannerHeight = 32;
  const maxBannerWidth = CONTENT_WIDTH * 0.85;

  let bannerWidth = maxBannerWidth;
  let bannerHeight = (bannerWidth * height) / width;

  if (bannerHeight > maxBannerHeight) {
    bannerHeight = maxBannerHeight;
    bannerWidth = (bannerHeight * width) / height;
  }

  const bannerX = MARGIN + (CONTENT_WIDTH - bannerWidth) / 2;
  doc.addImage(dataUrl, "PNG", bannerX, ctx.y, bannerWidth, bannerHeight);
  ctx.y += bannerHeight + 4;

  drawRunningHeader(ctx);

  const liturgical = getLiturgicalContextForPdf(
    data.liturgia,
    selectedDate,
    data.cor,
  );
  writeLiturgiaMetadataHeader(ctx, data.liturgia, liturgical);

  if (data.antifonas?.entrada) {
    writeSectionTitle(ctx, "ANTÍFONA DE ENTRADA");
    writeLines(ctx, splitParagraphs(data.antifonas.entrada));
    ctx.y += 2;
  }

  if (data.oracoes.coleta) {
    writePrayer(ctx, "Coleta", data.oracoes.coleta);
  }

  writeBannerSection(ctx, "LITURGIA DA PALAVRA");

  const primeira = data.leituras.primeiraLeitura ?? [];
  writeOptionsNote(ctx, primeira.length, "primeira leitura");
  primeira.forEach((leitura, index) => {
    writeReadingBlock(
      ctx,
      "PRIMEIRA LEITURA",
      leitura,
      primeira.length > 1 ? `Opção ${index + 1}` : undefined,
    );
  });

  const salmos = data.leituras.salmo ?? [];
  writeOptionsNote(ctx, salmos.length, "salmo");
  salmos.forEach((salmo, index) => {
    writeSalmoBlock(
      ctx,
      salmo,
      salmos.length > 1 ? `Opção ${index + 1}` : undefined,
    );
  });

  const segunda = data.leituras.segundaLeitura ?? [];
  if (segunda.length > 0) {
    writeOptionsNote(ctx, segunda.length, "segunda leitura");
    segunda.forEach((leitura, index) => {
      writeReadingBlock(
        ctx,
        "SEGUNDA LEITURA",
        leitura,
        segunda.length > 1 ? `Opção ${index + 1}` : undefined,
      );
    });
  }

  const evangelhos = data.leituras.evangelho ?? [];
  writeOptionsNote(ctx, evangelhos.length, "evangelho");
  evangelhos.forEach((evangelho, index) => {
    writeEvangelhoBlock(
      ctx,
      evangelho,
      evangelhos.length > 1 ? `Opção ${index + 1}` : undefined,
    );
  });

  writeBannerSection(ctx, "LITURGIA EUCARÍSTICA");

  if (data.oracoes.oferendas) {
    writePrayer(ctx, "Oração sobre as Oferendas", data.oracoes.oferendas);
  }

  writeOracaoEucaristica(ctx, data, selectedDate);

  if (data.antifonas?.comunhao || data.oracoes.comunhao) {
    writeBannerSection(ctx, "RITO DA COMUNHÃO");
  }

  if (data.antifonas?.comunhao) {
    writeSectionTitle(ctx, ANTIFONA_DE_COMUNHAO.toUpperCase());
    writeLines(ctx, splitParagraphs(data.antifonas.comunhao));
    ctx.y += 2;
  }

  if (data.oracoes.comunhao) {
    writePrayer(ctx, ORACAO_DEPOIS_DA_COMUNHAO.toUpperCase(), data.oracoes.comunhao);
  }

  data.oracoes.extras?.forEach((extra) => {
    writeSectionTitle(ctx, extra.titulo.toUpperCase());
    writeLines(ctx, splitParagraphs(extra.texto));
    ctx.y += 2;
  });

  writeHorizontalRule(ctx);
  writeLines(
    ctx,
    [
      "O celebrante deve ainda escolher o prefácio próprio do dia quando a Oração Eucarística II, III ou IV for utilizada, ou a inserção do Cânon quando for a Oração Eucarística I.",
    ],
    { fontSize: FONT_SMALL, style: "italic" },
  );

  addDocumentFooters(doc, data.liturgia, ctx.colors);

  const dateSlug = format(selectedDate, "yyyy-MM-dd");
  const nameSlug = sanitizeFileName(data.liturgia);
  doc.save(`liturgia-${dateSlug}-${nameSlug}.pdf`);
}
