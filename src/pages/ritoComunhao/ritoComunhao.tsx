import { ritoComunhaoData } from "./ritoComunhaoData";

export default function RitoComunhao() {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
            <h1 className="text-3xl font-bold text-center font-serif text-primary">
                {ritoComunhaoData.titulo}
            </h1>

            {ritoComunhaoData.subtitulo && (
                <p className="text-sm text-muted-foreground text-center">
                    {ritoComunhaoData.subtitulo}
                </p>
            )}

            {ritoComunhaoData.edicao && (
                <p className="text-sm text-center text-gray-500 italic">
                    {ritoComunhaoData.edicao}
                </p>
            )}

            <div className="space-y-8 mt-8">
                {ritoComunhaoData.secoes.map((secao, idx) => (
                    <div key={idx} className="border-b border-muted pb-6 last:border-b-0">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                                {secao.numero}
                            </span>
                            {secao.titulo && (
                                <h2 className="text-lg font-semibold text-foreground">
                                    {secao.titulo}
                                </h2>
                            )}
                        </div>

                        {secao.rubrica && (
                            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-3 rounded-r-lg mb-3">
                                <p className="text-sm text-red-900 dark:text-red-300 italic leading-relaxed whitespace-pre-line">
                                    {secao.rubrica}
                                </p>
                            </div>
                        )}

                        {secao.texto && secao.texto.map((paragrafo, pIdx) => (
                            <p key={`texto-${pIdx}`} className="leading-relaxed whitespace-pre-line mb-3">
                                {paragrafo}
                            </p>
                        ))}

                        {secao.rubrica2 && (
                            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-3 rounded-r-lg mb-3 mt-3">
                                <p className="text-sm text-red-900 dark:text-red-300 italic leading-relaxed whitespace-pre-line">
                                    {secao.rubrica2}
                                </p>
                            </div>
                        )}

                        {secao.texto2 && secao.texto2.map((paragrafo, pIdx) => (
                            <p key={`texto2-${pIdx}`} className="leading-relaxed whitespace-pre-line mb-3">
                                {paragrafo}
                            </p>
                        ))}

                        {secao.rubrica3 && (
                            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-3 rounded-r-lg mb-3 mt-3">
                                <p className="text-sm text-red-900 dark:text-red-300 italic leading-relaxed whitespace-pre-line">
                                    {secao.rubrica3}
                                </p>
                            </div>
                        )}

                        {secao.resposta && (
                            <div className="bg-muted/50 p-3 rounded-lg mb-3">
                                <p className="text-sm font-semibold uppercase text-muted-foreground mb-1">
                                    O povo responde:
                                </p>
                                <p className="leading-relaxed whitespace-pre-line">
                                    {secao.resposta}
                                </p>
                            </div>
                        )}

                        {secao.alternativa && (
                            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3 mt-3">
                                <p className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2">
                                    Ou:
                                </p>
                                {secao.alternativa.map((alt, aIdx) => (
                                    <p key={`alt-${aIdx}`} className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed whitespace-pre-line">
                                        {alt}
                                    </p>
                                ))}
                            </div>
                        )}

                        {secao.observacao && (
                            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3 rounded-r-lg mt-3">
                                <p className="text-sm text-amber-900 dark:text-amber-300 italic leading-relaxed">
                                    {secao.observacao}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

