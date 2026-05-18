import type { LiturgiaDiaResponse } from "@/interfaces/liturgiaTypes";
import { normalizeLiturgicalCross } from "@/lib/liturgicalSymbols";

function norm(text: string): string {
  return normalizeLiturgicalCross(text);
}

export function normalizeLiturgiaResponse(
  data: LiturgiaDiaResponse,
): LiturgiaDiaResponse {
  return {
    ...data,
    liturgia: norm(data.liturgia),
    oracoes: {
      ...data.oracoes,
      coleta: norm(data.oracoes.coleta),
      oferendas: norm(data.oracoes.oferendas),
      comunhao: norm(data.oracoes.comunhao),
      extras: data.oracoes.extras?.map((extra) => ({
        ...extra,
        titulo: norm(extra.titulo),
        texto: norm(extra.texto),
      })),
    },
    leituras: {
      ...data.leituras,
      primeiraLeitura: data.leituras.primeiraLeitura?.map((leitura) => ({
        ...leitura,
        titulo: norm(leitura.titulo),
        texto: norm(leitura.texto),
      })),
      segundaLeitura: data.leituras.segundaLeitura?.map((leitura) => ({
        ...leitura,
        titulo: norm(leitura.titulo),
        texto: norm(leitura.texto),
      })),
      evangelho: data.leituras.evangelho?.map((leitura) => ({
        ...leitura,
        titulo: norm(leitura.titulo),
        texto: norm(leitura.texto),
      })),
      salmo: data.leituras.salmo?.map((salmo) => ({
        ...salmo,
        referencia: norm(salmo.referencia),
        refrao: norm(salmo.refrao),
        texto: norm(salmo.texto),
      })),
      extras: data.leituras.extras?.map((leitura) => ({
        ...leitura,
        titulo: norm(leitura.titulo),
        texto: norm(leitura.texto),
        tipo: leitura.tipo ? norm(leitura.tipo) : leitura.tipo,
      })),
    },
    antifonas: data.antifonas
      ? {
          entrada: data.antifonas.entrada
            ? norm(data.antifonas.entrada)
            : undefined,
          comunhao: data.antifonas.comunhao
            ? norm(data.antifonas.comunhao)
            : undefined,
        }
      : undefined,
  };
}
