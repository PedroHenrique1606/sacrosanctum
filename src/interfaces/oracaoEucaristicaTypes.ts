export type OracaoEucaristicaVariacao = {
  contexto: string;
  texto: string[];
};

export type OracaoEucaristicaBloco = {
  contexto: string;
  texto: string[];
  variacoes?: OracaoEucaristicaVariacao[];
};

export type OracaoEucaristicaTextoItem = string | OracaoEucaristicaBloco;

export type OracaoEucaristica = {
  id: string;
  titulo: string;
  subtitulo: string;
  edicao: string;
  observacao?: string;
  texto: OracaoEucaristicaTextoItem[];
};

export type OracaoEucaristicaSelecao = {
  oracao: OracaoEucaristica;
  justificativa: string;
  variacoesAplicadas: string[];
  observacaoCelebrante: string;
};
