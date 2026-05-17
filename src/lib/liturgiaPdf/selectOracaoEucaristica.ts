import type { OracaoEucaristica } from "@/interfaces/oracaoEucaristicaTypes";
import type { OracaoEucaristicaSelecao } from "@/interfaces/oracaoEucaristicaTypes";
import { eucaristicasData } from "@/pages/oracaoEucaristica/oracaoEucaristicaData";
import {
  buildLiturgicalContext,
  tituloContem,
  type LiturgicalContext,
} from "./liturgicalContext";
import type { CorLiturgica } from "@/interfaces/liturgiaTypes";
import type { OracaoEucaristicaVariacao } from "@/interfaces/oracaoEucaristicaTypes";

type ScoreEntry = {
  id: string;
  score: number;
  motivos: string[];
};

const ORACOES_RESTRITAS = new Set([
  "eucaristica-c1",
  "eucaristica-c2",
  "eucaristica-c3",
  "eucaristica-r1",
  "eucaristica-r2",
  "eucaristica-d1",
  "eucaristica-d2",
  "eucaristica-d3",
  "eucaristica-d4",
  "eucaristica-v",
]);

function pontuarOracoes(ctx: LiturgicalContext): ScoreEntry[] {
  const scores = new Map<string, ScoreEntry>();

  const add = (id: string, pontos: number, motivo: string) => {
    const atual = scores.get(id) ?? { id, score: 0, motivos: [] };
    atual.score += pontos;
    atual.motivos.push(motivo);
    scores.set(id, atual);
  };

  const penalizarEspeciais = () => {
    for (const id of ORACOES_RESTRITAS) {
      add(id, -200, "Oração reservada a circunstâncias específicas");
    }
  };

  penalizarEspeciais();

  if (tituloContem(ctx, "crianca", "criancas", "infantil")) {
    add("eucaristica-c1", 220, "Missa com crianças");
    add("eucaristica-c2", 210, "Alternativa para missa com crianças");
    add("eucaristica-c3", 200, "Alternativa para missa com crianças");
    return [...scores.values()];
  }

  if (tituloContem(ctx, "reconciliacao", "penitencial")) {
    add("eucaristica-r1", 220, "Celebração penitencial ou de reconciliação");
    add("eucaristica-r2", 210, "Alternativa para reconciliação");
    return [...scores.values()];
  }

  if (tituloContem(ctx, "unidade dos cristaos", "unidade crista")) {
    add("eucaristica-d1", 220, "Semana de oração pela unidade dos cristãos");
    return [...scores.values()];
  }

  if (tituloContem(ctx, "dedicação", "dedicacao", "paroquial")) {
    add("eucaristica-d3", 200, "Dedicicação ou festa paroquial");
  }

  if (ctx.isSolenidade) {
    add(
      "eucaristica-i",
      120,
      "Solenidade: o Cânon Romano (OE I) é o mais indicado no Missal Romano",
    );
    add(
      "eucaristica-iii",
      85,
      "OE III é alternativa frequente em solenidades",
    );
    add("eucaristica-iv", 40, "OE IV pode ser usada em solenidades dominicais");
  }

  if (ctx.isDomingo && !ctx.isSolenidade) {
    add(
      "eucaristica-i",
      100,
      "Domingo: OE I com inserções próprias do tempo",
    );
    add("eucaristica-iii", 80, "OE III é uso comum aos domingos");
    add("eucaristica-ii", 35, "OE II é possível, porém menos usual ao domingo");
  }

  if (ctx.isFeria || ctx.isMemoria) {
    add(
      "eucaristica-ii",
      95,
      "Dia de semana: OE II é a mais habitual nas missas férreas",
    );
    add("eucaristica-iii", 88, "OE III é alternativa frequente nos dias úteis");
    add("eucaristica-i", 25, "OE I é reservada sobretudo a domingos e solenidades");
  }

  if (ctx.isFesta && !ctx.isSolenidade) {
    add("eucaristica-i", 90, "Festa: preferência pelo Cânon Romano");
    add("eucaristica-iii", 75, "OE III como alternativa em festas");
    add("eucaristica-ii", 50, "OE II em festas de dias úteis");
  }

  if (ctx.tempo === "pascoa") {
    add("eucaristica-i", 25, "Tempo pascal: inserções próprias do Cânon Romano");
    add("eucaristica-iii", 15, "Tempo pascal: OE III reúne paschal em um só texto");
  }

  if (ctx.tempo === "quaresma") {
    add("eucaristica-i", 20, "Quaresma: domingos favorecem o Cânon Romano");
    add("eucaristica-ii", 10, "Quaresma ferial: OE II é prática comum");
  }

  if (ctx.tempo === "natal") {
    add("eucaristica-i", 30, "Natal: inserções próprias do Cânon Romano");
  }

  if (scores.size === 0) {
    add("eucaristica-ii", 80, "Sugestão padrão para missa ferial");
    add("eucaristica-iii", 70, "Alternativa geral");
  }

  return [...scores.values()].sort((a, b) => b.score - a.score);
}

function pontuarVariacao(
  contexto: string,
  ctx: LiturgicalContext,
): number {
  const c = contexto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (tituloContem(ctx, "ascensao") && c.includes("ascensao")) return 100;
  if (tituloContem(ctx, "pentecostes") && c.includes("pentecostes")) {
    return 100;
  }
  if (tituloContem(ctx, "epifania") && c.includes("epifania")) return 100;
  if (
    (tituloContem(ctx, "natal") || ctx.tempo === "natal") &&
    c.includes("natal")
  ) {
    return 100;
  }
  if (
    (tituloContem(ctx, "ressurreicao", "pascoa") || ctx.tempo === "pascoa") &&
    (c.includes("pascal") || c.includes("ressurreicao") || c.includes("pascoa"))
  ) {
    return 95;
  }
  if (ctx.tempo === "pascoa" && c.includes("pascal")) return 90;
  if (ctx.isDomingo && c.includes("domingo")) return 85;
  if (ctx.isFeria && c.includes("feria")) return 70;

  return 0;
}

export function selecionarVariacao(
  variacoes: OracaoEucaristicaVariacao[] | undefined,
  ctx: LiturgicalContext,
): OracaoEucaristicaVariacao | null {
  if (!variacoes?.length) return null;

  let melhor: OracaoEucaristicaVariacao | null = null;
  let melhorPontuacao = 0;

  for (const variacao of variacoes) {
    const pontuacao = pontuarVariacao(variacao.contexto, ctx);
    if (pontuacao > melhorPontuacao) {
      melhorPontuacao = pontuacao;
      melhor = variacao;
    }
  }

  return melhorPontuacao > 0 ? melhor : null;
}

export function selecionarOracaoEucaristica(
  tituloLiturgia: string,
  data: Date,
  cor: CorLiturgica,
): OracaoEucaristicaSelecao {
  const ctx = buildLiturgicalContext(tituloLiturgia, data, cor);
  const ranking = pontuarOracoes(ctx);
  const vencedor = ranking[0];
  const oracao = eucaristicasData.find((item) => item.id === vencedor.id);

  if (!oracao) {
    throw new Error("Oração eucarística não encontrada nos dados do Sacrosanctum.");
  }

  const justificativa = vencedor.motivos.join(" ");

  const observacaoCelebrante =
    "Sugestão automática com base no título da liturgia e no dia da semana, segundo o costume do Missal Romano. O sacerdote celebrante pode e deve escolher outra oração ou variação quando as rubricas ou a pastoral o exigirem.";

  return {
    oracao: oracao as OracaoEucaristica,
    justificativa,
    variacoesAplicadas: [],
    observacaoCelebrante,
  };
}

export function getLiturgicalContextForPdf(
  tituloLiturgia: string,
  data: Date,
  cor: CorLiturgica,
): LiturgicalContext {
  return buildLiturgicalContext(tituloLiturgia, data, cor);
}
