interface OracaoEucaristicaProps {
    titulo: string;
    subtitulo?: string;
    edicao?: string;
    texto: string[];
}

export function OracaoEucaristicaPage({
    titulo,
    subtitulo,
    edicao,
    texto,
}: OracaoEucaristicaProps) {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
            <h1 className="text-3xl font-bold text-center font-serif text-primary">
                {titulo}
            </h1>

            {subtitulo && (
                <p className="text-sm text-muted-foreground text-center">
                    {subtitulo}
                </p>
            )}

            {edicao && (
                <p className="text-sm text-center text-gray-500 italic">
                    {edicao}
                </p>
            )}

            <div className="space-y-4 text-justify leading-relaxed">
                {texto.map((par, idx) => {
                    const isRubricaBlock = par.trim().startsWith('[Rúbrica Litúrgica]');

                    if (isRubricaBlock) {
                        const conteudo = par.replace('[Rúbrica Litúrgica]', '').trim();
                        return (
                            <div
                                key={idx}
                                className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-lg my-6"
                            >
                                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-3">
                                    Rúbrica Litúrgica
                                </p>
                                <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed italic whitespace-pre-line">
                                    {conteudo}
                                </p>
                            </div>
                        );
                    }

                    return (
                        <div key={idx} className="space-y-2">
                            {par.split('\n').map((linha, subIdx) => {
                                const isVariação = linha.trim().toLowerCase().startsWith('variações:');

                                return (
                                    <p
                                        key={subIdx}
                                        className={`whitespace-pre-wrap ${isVariação ? 'font-semibold text-red-500' : ''
                                            }`}
                                    >
                                        {linha}
                                    </p>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
