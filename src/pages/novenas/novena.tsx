import { useParams } from "react-router-dom";
import { novenasData } from "./novenasData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Novena() {
    const { id } = useParams();
    const navigate = useNavigate();
    const novena = novenasData.find((n) => n.id === id);

    if (!novena) {
        return (
            <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Novena não encontrada</h1>
                    <button 
                        onClick={() => navigate("/novenas")}
                        className="text-primary hover:underline"
                    >
                        Voltar para Novenas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="max-w-4xl mx-auto py-12 px-4">
                <button
                    onClick={() => navigate("/novenas")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Novenas
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">{novena.titulo}</h1>
                    {novena.subtitulo && (
                        <p className="text-xl text-primary mb-4">{novena.subtitulo}</p>
                    )}
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {novena.descricao}
                    </p>
                </div>

                <Separator className="my-8" />

                <div className="mb-8">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong>Como rezar a novena:</strong> Reze um dia por vez durante 9 dias consecutivos. 
                                Você pode fazer suas intenções pessoais após cada oração diária. 
                                Ao final dos 9 dias, reze a oração final.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {novena.tipo === 'via-sacra' && novena.estacoes ? (
                    <Accordion type="single" collapsible className="space-y-4">
                        {novena.estacoes.map((estacao) => (
                            <AccordionItem key={estacao.numero} value={`estacao-${estacao.numero}`} className="border rounded-lg">
                                <AccordionTrigger className="px-6 hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-primary text-primary-foreground">
                                            {estacao.numero}ª Estação
                                        </Badge>
                                        <span className="font-semibold text-left">{estacao.titulo}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="space-y-4 pt-4">
                                        {estacao.versiculo.map((linha, index) => (
                                            <p 
                                                key={`v-${index}`} 
                                                className={`leading-relaxed ${
                                                    linha.startsWith("V.") ? "text-primary font-semibold" : ""
                                                } ${
                                                    linha.startsWith("R.") ? "text-muted-foreground italic" : ""
                                                }`}
                                            >
                                                {linha}
                                            </p>
                                        ))}
                                        
                                        <div className="my-4 border-l-4 border-primary pl-4">
                                            {estacao.oracao.map((linha, index) => (
                                                <p key={`o-${index}`} className="leading-relaxed italic text-muted-foreground">
                                                    {linha}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="bg-muted/30 p-4 rounded-lg">
                                            {estacao.refrao.map((linha, index) => (
                                                <p 
                                                    key={`r-${index}`} 
                                                    className={`leading-relaxed ${
                                                        index === 0 ? "font-semibold text-primary mb-2" : "italic text-sm"
                                                    }`}
                                                >
                                                    {linha}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <Accordion type="single" collapsible className="space-y-4">
                        {novena.dias?.map((dia) => (
                            <AccordionItem key={dia.dia} value={`dia-${dia.dia}`} className="border rounded-lg">
                                <AccordionTrigger className="px-6 hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-primary text-primary-foreground">
                                            Dia {dia.dia}
                                        </Badge>
                                        {dia.titulo && (
                                            <span className="font-semibold text-left">{dia.titulo}</span>
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="space-y-4 pt-4">
                                        {dia.oracao.map((paragrafo, index) => (
                                            <p 
                                                key={index} 
                                                className={`leading-relaxed ${
                                                    paragrafo === "" ? "h-2" : ""
                                                } ${
                                                    paragrafo.startsWith("Em nome do Pai") || 
                                                    paragrafo.includes("rogai por nós") 
                                                        ? "text-primary font-semibold" 
                                                        : ""
                                                }`}
                                            >
                                                {paragrafo}
                                            </p>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}

                {novena.oracaoFinal && (
                    <Card className="mt-8 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">
                                {novena.oracaoFinal[0]}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {novena.oracaoFinal.slice(1).map((paragrafo, index) => (
                                    <p 
                                        key={index} 
                                        className={`leading-relaxed text-center ${
                                            paragrafo === "" ? "h-2" : ""
                                        } ${
                                            paragrafo.includes("rogai por nós") 
                                                ? "text-primary font-semibold text-lg" 
                                                : ""
                                        }`}
                                    >
                                        {paragrafo}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

