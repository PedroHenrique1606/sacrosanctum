import type { CorLiturgica } from "@/interfaces/liturgiaTypes";

export type TempoLiturgico =
  | "advento"
  | "natal"
  | "quaresma"
  | "pascoa"
  | "tempo-comum"
  | "desconhecido";

export type LiturgicalContext = {
  titulo: string;
  tituloNormalizado: string;
  data: Date;
  diaSemana: number;
  isDomingo: boolean;
  isSolenidade: boolean;
  isFesta: boolean;
  isMemoria: boolean;
  isFeria: boolean;
  tempo: TempoLiturgico;
  cor: CorLiturgica;
  numeroDomingo?: number;
  cicloLiturgico: "A" | "B" | "C";
  anoLiturgico: number;
};

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function detectTempo(titulo: string): TempoLiturgico {
  if (titulo.includes("advento")) return "advento";
  if (titulo.includes("quaresima") || titulo.includes("quaresma")) {
    return "quaresma";
  }
  if (
    titulo.includes("pascoa") ||
    titulo.includes("pascal") ||
    titulo.includes("pentecostes") ||
    titulo.includes("ascensao")
  ) {
    return "pascoa";
  }
  if (titulo.includes("natal") || titulo.includes("epifania")) {
    return "natal";
  }
  if (titulo.includes("tempo comum")) return "tempo-comum";
  return "desconhecido";
}

function detectCicloLiturgico(date: Date): { ciclo: "A" | "B" | "C"; ano: number } {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const anoLiturgico =
    month > 10 || (month === 10 && day >= 27) ? year + 1 : year;

  const cicloPorAno: Record<number, "A" | "B" | "C"> = {
    2023: "A",
    2024: "B",
    2025: "C",
    2026: "A",
    2027: "B",
    2028: "C",
    2029: "A",
    2030: "B",
  };

  return {
    ano: anoLiturgico,
    ciclo: cicloPorAno[anoLiturgico] ?? "A",
  };
}

export function buildLiturgicalContext(
  tituloLiturgia: string,
  data: Date,
  cor: CorLiturgica,
): LiturgicalContext {
  const tituloNormalizado = normalize(tituloLiturgia);
  const diaSemana = data.getDay();
  const isDomingo = diaSemana === 0;

  const isSolenidade =
    tituloNormalizado.includes("solenidade") ||
    tituloNormalizado.includes("vigilia") ||
    tituloNormalizado.includes("pascoa da ressurreicao") ||
    tituloNormalizado.includes("semana santa") ||
    tituloNormalizado.includes("sabado santo");

  const isFesta =
    !isSolenidade &&
    (tituloNormalizado.includes("festa") ||
      tituloNormalizado.includes("natividade"));

  const isMemoria =
    !isSolenidade &&
    !isFesta &&
    (tituloNormalizado.includes("memoria") ||
      tituloNormalizado.includes("memoria facultativa"));

  const isFeria =
    !isDomingo && !isSolenidade && !isFesta && !isMemoria;

  const domingoMatch = tituloLiturgia.match(
    /(\d+)[ºª°]?\s*Domingo/i,
  );
  const numeroDomingo = domingoMatch
    ? Number.parseInt(domingoMatch[1], 10)
    : undefined;

  const { ciclo, ano } = detectCicloLiturgico(data);

  return {
    titulo: tituloLiturgia,
    tituloNormalizado,
    data,
    diaSemana,
    isDomingo,
    isSolenidade,
    isFesta,
    isMemoria,
    isFeria,
    tempo: detectTempo(tituloNormalizado),
    cor,
    numeroDomingo,
    cicloLiturgico: ciclo,
    anoLiturgico: ano,
  };
}

export function tituloContem(
  ctx: LiturgicalContext,
  ...termos: string[]
): boolean {
  return termos.some((termo) => ctx.tituloNormalizado.includes(normalize(termo)));
}
