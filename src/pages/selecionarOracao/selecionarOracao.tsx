import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const oracoes = [
    { id: "eucaristica-i", title: "Oração Eucarística I (Cânon Romano)" },
    { id: "eucaristica-ii", title: "Oração Eucarística II" },
    { id: "eucaristica-iii", title: "Oração Eucarística III" },
    { id: "eucaristica-iv", title: "Oração Eucarística IV" },
    { id: "eucaristica-v", title: "Oração Eucarística V (do Congresso de Manaus)" },
    { id: "eucaristica-d1", title: "Oração Eucarística (D1) - A Igreja A Caminho Da Unidade" },
    { id: "eucaristica-d2", title: "Oração Eucarística (D2) - Deus Conduz Sua Igreja No Caminho Da Salvação" },
    { id: "eucaristica-d3", title: "Oração Eucarística (D3) - Jesus, Caminho para o Pai" },
    { id: "eucaristica-d4", title: "Oração Eucarística (D4) - Jesus que passa fazendo o bem" },
    { id: "eucaristica-r1", title: "Oração Eucarística (R1) - sobre a Reconciliação I" },
    { id: "eucaristica-r2", title: "Oração Eucarística (R2) - sobre a Reconciliação II" },
    { id: "eucaristica-c1", title: "Oração Eucarística (C1) - Para Missas com Crianças I" },
    { id: "eucaristica-c2", title: "Oração Eucarística (C2) - Para Missas com Crianças II" },
    { id: "eucaristica-c3", title: "Oração Eucarística (C3) - Para Missas com Crianças III" },
];

export default function OracoesEucaristicas() {
    const navigate = useNavigate();

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
            <h1 className="text-3xl font-bold text-center font-serif text-primary">
                Orações Eucarísticas
            </h1>

            <p className="text-muted-foreground text-center">
                Selecione uma das orações eucarísticas para visualizar seu texto completo.
            </p>

            <div className="grid gap-4">
                {oracoes.map((oracao) => (
                    <Card
                        key={oracao.id}
                        className="cursor-pointer hover:shadow-lg transition"
                        onClick={() => navigate(`/oracao-eucaristica/${oracao.id}`)}
                    >
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold text-primary">{oracao.title}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
