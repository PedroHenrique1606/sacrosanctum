import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, Cross, Wifi, Bird, Mountain, Sparkles } from "lucide-react";

const novenas = [
    { 
        id: "nossa-senhora-aparecida", 
        title: "Nossa Senhora Aparecida",
        description: "Padroeira do Brasil",
        icon: Heart,
        color: "text-blue-600 dark:text-blue-400"
    },
    { 
        id: "sao-jose", 
        title: "São José",
        description: "Padroeiro da Igreja Universal",
        icon: Cross,
        color: "text-amber-600 dark:text-amber-400"
    },
    { 
        id: "sao-carlo-acutis", 
        title: "São Carlo Acutis",
        description: "Anjo da Juventude - Patrono da Internet",
        icon: Wifi,
        color: "text-purple-600 dark:text-purple-400"
    },
    { 
        id: "sao-francisco-de-assis", 
        title: "São Francisco de Assis",
        description: "O Pobrezinho de Assis - Patrono dos Animais",
        icon: Bird,
        color: "text-green-600 dark:text-green-400"
    },
];

const devotions = [
    { 
        id: "via-sacra", 
        title: "Via Sacra",
        description: "O Caminho da Cruz - 15 Estações",
        icon: Mountain,
        color: "text-red-600 dark:text-red-400"
    },
    { 
        id: "terco-divina-misericordia", 
        title: "Terço da Divina Misericórdia",
        description: "Coroa da Misericórdia - Reze às 15h",
        icon: Sparkles,
        color: "text-sky-600 dark:text-sky-400"
    },
];

export default function SelecionarNovena() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="h-10 w-10 text-primary" />
                        <h1 className="text-4xl font-bold">Novenas e Devoções</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Reze novenas aos santos e participe das devoções tradicionais da Igreja Católica
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Novenas</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {novenas.map((novena) => {
                            const Icon = novena.icon;
                            return (
                                <Card 
                                    key={novena.id}
                                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20"
                                    onClick={() => navigate(`/novena/${novena.id}`)}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Icon className={`h-6 w-6 ${novena.color}`} />
                                            <CardTitle className="text-xl">{novena.title}</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">
                                            {novena.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Clique para começar a novena de 9 dias
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Devoções</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {devotions.map((devotion) => {
                            const Icon = devotion.icon;
                            return (
                                <Card 
                                    key={devotion.id}
                                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20"
                                    onClick={() => navigate(`/novena/${devotion.id}`)}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Icon className={`h-6 w-6 ${devotion.color}`} />
                                            <CardTitle className="text-xl">{devotion.title}</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">
                                            {devotion.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Clique para rezar a devoção
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold mb-3">Em breve</h3>
                    <p className="text-muted-foreground mb-4">
                        Mais novenas e devoções serão adicionadas em breve:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Novena ao Espírito Santo</span>
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Sagrado Coração de Jesus</span>
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Imaculado Coração de Maria</span>
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Devoção do Primeiro Sábado</span>
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Devoção da Primeira Sexta-feira</span>
                        <span className="px-4 py-2 bg-background rounded-full text-sm">Novena de Natal</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

