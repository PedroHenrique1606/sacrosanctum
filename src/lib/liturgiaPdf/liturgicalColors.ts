import type { CorLiturgica } from "@/interfaces/liturgiaTypes";

export type Rgb = [number, number, number];

export type LiturgicalColorPalette = {
  cor: CorLiturgica;
  label: string;
  primary: Rgb;
  light: Rgb;
  text: Rgb;
  border: Rgb;
};

const PALETTES: Record<CorLiturgica, LiturgicalColorPalette> = {
  Verde: {
    cor: "Verde",
    label: "VERDE",
    primary: [22, 101, 52],
    light: [220, 252, 231],
    text: [20, 83, 45],
    border: [134, 239, 172],
  },
  Vermelho: {
    cor: "Vermelho",
    label: "VERMELHO",
    primary: [185, 28, 28],
    light: [254, 226, 226],
    text: [153, 27, 27],
    border: [252, 165, 165],
  },
  Roxo: {
    cor: "Roxo",
    label: "ROXO",
    primary: [107, 33, 168],
    light: [243, 232, 255],
    text: [88, 28, 135],
    border: [216, 180, 254],
  },
  Rosa: {
    cor: "Rosa",
    label: "ROSA",
    primary: [190, 24, 93],
    light: [252, 231, 243],
    text: [157, 23, 77],
    border: [249, 168, 212],
  },
  Branco: {
    cor: "Branco",
    label: "BRANCO",
    primary: [75, 85, 99],
    light: [248, 250, 252],
    text: [55, 65, 81],
    border: [203, 213, 225],
  },
};

export function getLiturgicalColorPalette(cor: CorLiturgica): LiturgicalColorPalette {
  return PALETTES[cor];
}

export function setPdfFill(doc: { setFillColor: (...c: number[]) => void }, rgb: Rgb) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}

export function setPdfDraw(doc: { setDrawColor: (...c: number[]) => void }, rgb: Rgb) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}

export function setPdfText(doc: { setTextColor: (...c: number[]) => void }, rgb: Rgb) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

export function resetPdfText(doc: { setTextColor: (...c: number[]) => void }) {
  doc.setTextColor(0, 0, 0);
}
