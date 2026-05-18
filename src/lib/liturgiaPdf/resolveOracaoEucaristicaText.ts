import type {
  OracaoEucaristica,
  OracaoEucaristicaBloco,
  OracaoEucaristicaTextoItem,
} from "@/interfaces/oracaoEucaristicaTypes";
import { normalizeLiturgicalCross } from "@/lib/liturgicalSymbols";
import type { LiturgicalContext } from "./liturgicalContext";
import { selecionarVariacao } from "./selectOracaoEucaristica";

export type LinhaOracaoPdf =
  | {
      tipo: "rubrica";
      texto: string;
    }
  | {
      tipo: "dialogo";
      personagem: string;
      texto: string;
    }
  | {
      tipo: "instituicao";
      texto: string;
    }
  | {
      tipo: "texto";
      texto: string;
    }
  | {
      tipo: "alternativa";
      texto: string;
    };

const SPEAKER_PATTERN =
  /^(CP ou CC|CP|CC|AS|PR|1C|2C|3C|4C|P\.?|T\.?)\s*[:.]?\s*(.*)$/i;

const INSTITUTION_PATTERN = /^TOMAI,\s*TODOS/i;

function parseLinha(raw: string): LinhaOracaoPdf {
  const trimmed = normalizeLiturgicalCross(raw.trim());
  if (!trimmed) return { tipo: "texto", texto: "" };

  if (trimmed === "Ou:") {
    return { tipo: "alternativa", texto: "Ou:" };
  }

  if (INSTITUTION_PATTERN.test(trimmed)) {
    return { tipo: "instituicao", texto: trimmed };
  }

  const speakerMatch = trimmed.match(SPEAKER_PATTERN);
  if (speakerMatch) {
    const [, personagem, resto] = speakerMatch;
    const texto = resto?.trim() || trimmed;
    return {
      tipo: "dialogo",
      personagem: personagem.toUpperCase().replace(/\s+/g, " "),
      texto,
    };
  }

  if (trimmed.startsWith("[Rúbrica")) {
    return { tipo: "rubrica", texto: trimmed.replace(/^\[Rúbrica Litúrgica\]\s*/i, "") };
  }

  if (trimmed.startsWith("Mistério da fé")) {
    return { tipo: "rubrica", texto: trimmed };
  }

  if (trimmed.startsWith("E segue o Rito")) {
    return { tipo: "rubrica", texto: trimmed };
  }

  return { tipo: "texto", texto: trimmed };
}

function flattenBloco(
  bloco: OracaoEucaristicaBloco,
  ctx: LiturgicalContext,
  variacoesAplicadas: string[],
): LinhaOracaoPdf[] {
  const linhas: LinhaOracaoPdf[] = [];
  const variacao = selecionarVariacao(bloco.variacoes, ctx);

  if (variacao) {
    variacoesAplicadas.push(variacao.contexto);
    linhas.push({
      tipo: "rubrica",
      texto: `[${bloco.contexto} — ${variacao.contexto}]`,
    });
    for (const linha of variacao.texto) {
      linhas.push(parseLinha(linha));
    }
    return linhas;
  }

  if (bloco.contexto && bloco.contexto !== "memento dos vivos") {
    linhas.push({ tipo: "rubrica", texto: `[${bloco.contexto}]` });
  }

  for (const linha of bloco.texto) {
    linhas.push(parseLinha(linha));
  }

  return linhas;
}

export function resolverTextoOracaoEucaristica(
  oracao: OracaoEucaristica,
  ctx: LiturgicalContext,
): { linhas: LinhaOracaoPdf[]; variacoesAplicadas: string[] } {
  const linhas: LinhaOracaoPdf[] = [];
  const variacoesAplicadas: string[] = [];

  if (oracao.observacao) {
    linhas.push({ tipo: "rubrica", texto: oracao.observacao });
  }

  for (const item of oracao.texto) {
    if (typeof item === "string") {
      const parsed = parseLinha(item);
      if (parsed.tipo === "texto" && !parsed.texto) continue;
      linhas.push(parsed);
      continue;
    }

    linhas.push(...flattenBloco(item, ctx, variacoesAplicadas));
  }

  return { linhas, variacoesAplicadas: [...new Set(variacoesAplicadas)] };
}

export function personagemParaMissal(personagem: string): string {
  const mapa: Record<string, string> = {
    CP: "P.",
    CC: "C.",
    AS: "T.",
    PR: "P.",
    "CP OU CC": "P.",
    "1C": "C.",
    "2C": "C.",
    "3C": "C.",
    "4C": "C.",
    P: "P.",
    T: "T.",
  };
  return mapa[personagem.toUpperCase()] ?? `${personagem}.`;
}

export function isOracaoEucaristicaBloco(
  item: OracaoEucaristicaTextoItem,
): item is OracaoEucaristicaBloco {
  return typeof item !== "string";
}
