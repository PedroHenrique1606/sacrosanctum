import { normalizeLiturgicalCross } from "@/lib/liturgicalSymbols";
import { useParams } from "react-router-dom";
import { eucaristicasData } from "./oracaoEucaristicaData";
import { OracaoEucaristicaPage } from "./oracaoEucaristicaPages";

export default function OracaoEucaristicaDynamic() {
    const { id } = useParams();
    const oracao = eucaristicasData.find((o) => o.id === id);

    if (!oracao) {
        return (
            <div className="max-w-3xl mx-auto py-10 px-4 text-center text-red-600">
                Oração não encontrada.
            </div>
        );
    }

    return (
        <OracaoEucaristicaPage
            titulo={oracao.titulo}
            subtitulo={oracao.subtitulo}
            edicao={oracao.edicao}
            texto={oracao.texto.map((item) => {
                if (typeof item === "string") {
                    return normalizeLiturgicalCross(item);
                } else {
                    let base = `${item.contexto}\n${item.texto.join('\n')}`;
                    if (item.variacoes) {
                        base += '\n\nVariações:\n';
                        base += item.variacoes.map(v => `${v.contexto}\n${v.texto.join('\n')}`).join('\n\n');
                    }
                    return normalizeLiturgicalCross(base);
                }
            })}
        />
    );
}
