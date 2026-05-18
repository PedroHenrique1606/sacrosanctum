/** Cruz latina com traço diagonal inferior (U+2720) — marca de sinal da cruz no Missal */
export const LITURGICAL_CROSS = "\u2720";

/**
 * Substitui marcadores de sinal da cruz (* ou †) por ✠ (U+2720)
 * em textos litúrgicos (bênçãos, consagração, nomes do Papa/Bispo etc.).
 */
export function normalizeLiturgicalCross(text: string): string {
  if (!text.includes("*") && !text.includes("†") && !text.includes("✠")) {
    return text;
  }

  return text
    .replace(/†/g, LITURGICAL_CROSS)
    .replace(/\s\*\s/g, ` ${LITURGICAL_CROSS} `)
    .replace(/abençoeis\s+\*/gi, `abençoeis ${LITURGICAL_CROSS}`)
    .replace(/abençoar\s+\*/gi, `abençoar ${LITURGICAL_CROSS}`)
    .replace(/(Corpo)\s+\*\s+(e)\s/i, `$1 ${LITURGICAL_CROSS} $2 `)
    .replace(/(Corpo)\s+e\s+\*(o)\s/i, `$1 e ${LITURGICAL_CROSS} $2 `)
    .replace(/(Corpo)\s+\*(?=e\s)/i, `$1 ${LITURGICAL_CROSS} `)
    .replace(/(Corpo)\s+\*/i, `$1 ${LITURGICAL_CROSS} `)
    .replace(/\*N\./g, `${LITURGICAL_CROSS} N.`)
    .replace(/\* N\./g, `${LITURGICAL_CROSS} N.`)
    .replace(/([,.;:)\]])\*/g, `$1${LITURGICAL_CROSS}`)
    .replace(/(^|\s)\*(?=[A-Za-zÀ-ú])/g, `$1${LITURGICAL_CROSS} `);
}
