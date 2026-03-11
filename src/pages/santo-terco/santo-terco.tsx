import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Mystery {
    title: string
    contemplation: string
    verse: string
}

const allMysteries: Record<string, { title: string; mysteries: Mystery[] }> = {
    Gozosos: {
        title: "Mistérios Gozosos",
        mysteries: [
            {
                title: "A anunciação do Anjo à Virgem Maria.",
                contemplation: "Contemplamos o Anjo Gabriel anunciando a Maria que ela seria mãe de Jesus.",
                verse: `6. No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia, chamada Nazaré,  27. a uma virgem desposada com um homem que se chamava José, da casa de Davi; e o nome da virgem era Maria. 28. Entrando, o anjo disse-lhe: “Ave, cheia de graça, o Senhor é contigo”. 29. Perturbou-se ela com essas palavras e pôs-se a pensar no que significaria semelhante saudação. 30. O anjo disse-lhe: “Não temas, Maria, pois encontraste graça diante de Deus. 3Eis que conceberás e darás à luz um filho, e lhe porás o nome de Jesus. 3Ele será grande e será chamado Filho do Altíssimo, e o Senhor Deus lhe dará o trono de seu pai Davi; 3e reinará eternamente na casa de Jacó, e o seu reino não terá fim”. 3Maria perguntou ao anjo: “Como se fará isso, pois não conheço homem?” 3Respondeu-lhe o anjo: “O Espírito Santo descerá sobre ti, e a força do Altíssimo te envolverá com a sua sombra. Por isso, o ente santo que nascer de ti será chamado Filho de Deus. 36. Também Isabel, tua parenta, até ela concebeu um filho na sua velhice; e já está no sexto mês aquela que é tida por estéril, 37. porque a Deus nenhuma coisa é impossível”. 38. Então disse Maria: “Eis aqui a serva do Senhor. Faça-se em mim segundo a tua palavra”. E o anjo afastou-se dela. (Lucas 1, 26-38)`,
            },
            {
                title: "A visita de Maria a Santa Isabel.",
                contemplation: "Maria visita sua prima Isabel, levando Jesus em seu ventre.",
                verse: "De onde vem a felicidade de que a Mãe do meu Senhor me visite? (Lucas 1,43)",
            },
            {
                title: "O nascimento de Jesus em Belém.",
                contemplation: "Em Belém, nasce o Salvador do mundo.",
                verse: "O verbo se fez carne e habitou entre nós. (João 1,14)",
            },
            {
                title: "A Apresentação de Jesus no Templo.",
                contemplation: "Maria e José apresentam Jesus no Templo.",
                verse: "Eis aqui este menino que está destinado para ser sinal de contradição. (Lucas 2,34)",
            },
            {
                title: "A perda e encontro de Jesus no Templo.",
                contemplation: "Maria e José encontram Jesus entre os doutores da lei.",
                verse: "Por que me procuráveis? Não sabeis que devo ocupar-me com as coisas do meu Pai?(Lucas 2,49)",
            }
        ]
    },
    Dolorosos: {
        title: "Mistérios Dolorosos",
        mysteries: [
            {
                title: "Agonia de Jesus no Horto das Oliveiras.",
                contemplation: "Contemplamos Jesus em agonia no Horto das Oliveiras.",
                verse: "Jesus saiu e foi, como de costume, para o Monte das Oliveiras, e os discípulos o acompanharam. Quando chegou ao lugar, disse-lhes: 'Orai, para que não entreis em tentação'. Afastou-se deles cerca de um tiro de pedra e, pondo-se de joelhos, orava: 'Pai, se queres, afasta de mim este cálice! Todavia, não se faça a minha vontade, mas a tua'. Apareceu-lhe então um anjo do céu para confortá-lo. Entrou em agonia e orava ainda com mais instância, e seu suor tornou-se como gotas de sangue a escorrer pela terra. Levantando-se da oração, foi até os discípulos e os encontrou dormindo, de tristeza. E disse-lhes: 'Por que dormis? Levantai-vos e orai, para que não entreis em tentação'."
            },
            {
                title: "Flagelação de Jesus, preso à coluna.",
                contemplation: "Jesus é cruelmente flagelado pelos soldados.",
                verse: "Pilatos então tomou Jesus e mandou flagelá-lo."
            },
            {
                title: "Coroação de Espinhos",
                contemplation: "Jesus é coroado com espinhos.",
                verse: "Os soldados levaram Jesus para dentro do pátio, isto é, ao pretório, e convocaram toda a coorte. Vestiram-no com um manto de púrpura, teceram uma coroa de espinhos e a puseram em sua cabeça. E começaram a saudá-lo: 'Salve, rei dos judeus!' Batiam-lhe na cabeça com uma cana, cuspiam nele e, dobrando os joelhos, prostravam-se diante dele. Depois de terem escarnecido dele, tiraram-lhe o manto de púrpura e vestiram-no com suas próprias roupas. Então o levaram para fora a fim de crucificá-lo."
            },
            {
                title: "Jesus carrega a cruz até o Calvário.",
                contemplation: "Jesus carrega a cruz até o Calvário.",
                verse: "Tomaram então Jesus, que carregando a sua cruz, saiu para o lugar chamado Calvário, em hebraico Gólgota."
            },
            {
                title: "Jesus é crucificado e morre na cruz.",
                contemplation: "Jesus é pregado na cruz e morre por nós.",
                verse: "Quando chegaram ao lugar chamado Calvário, ali o crucificaram, como também os malfeitores, um à direita e outro à esquerda. Jesus dizia: 'Pai, perdoa-lhes, porque não sabem o que fazem'. Depois, dividindo as suas vestes, lançaram sortes. O povo permanecia ali a contemplá-lo. Os chefes zombavam, dizendo: 'Salvou os outros, salve-se a si mesmo, se é o Cristo de Deus, o Escolhido!' Os soldados também o escarneciam, aproximando-se para lhe oferecer vinagre e dizendo: 'Se és o rei dos judeus, salva-te a ti mesmo!' Havia por cima dele um letreiro: 'Este é o Rei dos Judeus'. Um dos malfeitores crucificados blasfemava contra ele: 'Não és tu o Cristo? Salva-te a ti mesmo e a nós!' Mas o outro, tomando a palavra, repreendeu-o: 'Nem sequer temes a Deus, estando sob o mesmo suplício? Para nós é justo, porque recebemos o castigo que as nossas ações mereciam; mas este não fez mal algum'. E acrescentou: 'Jesus, lembra-te de mim, quando vieres com o teu reino'. Jesus respondeu-lhe: 'Em verdade te digo: hoje estarás comigo no Paraíso'. Era já quase a hora sexta quando as trevas cobriram toda a terra até a hora nona, porque o sol se eclipsara. O véu do templo rasgou-se ao meio. E Jesus, clamando com grande voz, disse: 'Pai, em tuas mãos entrego o meu espírito'. E, dizendo isso, expirou."
            }
        ]
    },
    Gloriosos: {
        title: "Mistérios Gloriosos",
        mysteries: [
            {
                title: "Ressurreição de Jesus ao terceiro dia.",
                contemplation: "Jesus ressuscita ao terceiro dia.",
                verse: "No primeiro dia da semana, de manhã bem cedo, as mulheres levaram ao sepulcro as especiarias aromáticas que haviam preparado. Encontraram removida a pedra do sepulcro, mas, quando entraram, não encontraram o corpo do Senhor Jesus. Ficaram perplexas, sem saber o que fazer. De repente, dois homens com roupas que brilhavam como a luz do sol colocaram-se ao lado delas. Amedrontadas, as mulheres baixaram o rosto para o chão, e os homens lhes disseram: “Por que vocês estão procurando entre os mortos aquele que vive? Ele não está aqui! Ressuscitou! Lembrem-se do que ele lhes disse, quando ainda estava com vocês na Galiléia: ‘É necessário que o Filho do homem seja entregue nas mãos de homens pecadores, seja crucificado e ressuscite no terceiro dia’”. Então se lembraram das palavras de Jesus. Quando voltaram do sepulcro, elas contaram todas estas coisas aos Onze e a todos os outros. As que contaram estas coisas aos apóstolos foram Maria Madalena, Joana e Maria, mãe de Tiago, e as outras que estavam com elas. Mas eles não acreditaram nas mulheres; as palavras delas lhes pareciam loucura. Pedro, todavia, levantou-se e correu ao sepulcro. Abaixando-se, viu as faixas de linho e mais nada; afastou-se, e voltou admirado com o que acontecera.",
            },
            {
                title: "Ascensão de Jesus ao Céu.",
                contemplation: "Jesus sobe ao Céu diante dos Apóstolos.",
                verse: "Então os que estavam reunidos lhe perguntaram: “Senhor, é neste tempo que vais restaurar o reino a Israel?” Ele lhes respondeu: “Não lhes compete saber os tempos ou as datas que o Pai estabeleceu pela sua própria autoridade. Mas receberão poder quando o Espírito Santo descer sobre vocês, e serão minhas testemunhas em Jerusalém, em toda a Judéia e Samaria, e até os confins da terra”. Tendo dito isso, foi elevado às alturas enquanto eles olhavam, e uma nuvem o encobriu da vista deles. E eles ficaram com os olhos fixos no céu enquanto ele subia. De repente surgiram diante deles dois homens vestidos de branco, que lhes disseram: “Galileus, por que vocês estão olhando para o céu? Este mesmo Jesus, que dentre vocês foi elevado aos céus, voltará da mesma forma como o viram subir”.",
            },
            {
                title: "A descida do Espírito Santo sobre os Apóstolos.",
                contemplation: "O Espírito Santo desce sobre os Apóstolos.",
                verse: "Chegando o dia de Pentecoste, estavam todos reunidos num só lugar. De repente veio do céu um som, como de um vento muito forte, e encheu toda a casa na qual estavam assentados. E viram o que parecia línguas de fogo, que se separaram e pousaram sobre cada um deles. Todos ficaram cheios do Espírito Santo e começaram a falar noutras línguas, conforme o Espírito os capacitava. Havia em Jerusalém judeus, tementes a Deus, vindos de todas as nações do mundo. Ouvindo-se o som, ajuntou-se uma multidão que ficou perplexa, pois cada um os ouvia falar em sua própria língua. Atônitos e maravilhados, eles perguntavam: “Acaso não são galileus todos estes homens que estão falando? Então, como os ouvimos, cada um de nós, em nossa própria língua materna? Partos, medos e elamitas; habitantes da Mesopotâmia, Judéia e Capadócia, do Ponto e da província da Ásia, Frígia e Panfília, Egito e das partes da Líbia próximas a Cirene; visitantes vindos de Roma, tanto judeus como convertidos ao judaísmo; cretenses e árabes. Nós os ouvimos declarar as maravilhas de Deus em nossa própria língua!” Atônitos e perplexos, todos perguntavam uns aos outros: “Que significa isto?” Alguns, todavia, zombavam deles e diziam: “Eles beberam vinho demais”.",
            },
            {
                title: "A assunção da Santíssima Virgem Maria ao céu.",
                contemplation: "Maria é levada ao Céu, de corpo e alma.",
                verse: "Apareceu no céu um sinal extraordinário: uma mulher vestida do sol, com a lua debaixo dos seus pés e uma coroa de doze estrelas sobre a cabeça. (Apocalipse 12:1); tradição da Igreja",
            },
            {
                title: "Coroação de Maria",
                contemplation: "Maria é coroada Rainha do Céu e da Terra.",
                verse: "Apareceu no céu um sinal extraordinário: uma mulher vestida do sol, com a lua debaixo dos seus pés e uma coroa de doze estrelas sobre a cabeça.",
            }
        ]
    },
    Luz: {
        title: "Mistérios da Luz",
        mysteries: [
            {
                title: "Batismo de Jesus no rio Jordão.",
                contemplation: "Jesus é batizado por João Batista.",
                verse: "Então Jesus veio da Galiléia ao Jordão para ser batizado por João. João, porém, tentou impedi-lo, dizendo: “Eu preciso ser batizado por ti, e tu vens a mim?” Respondeu Jesus: “Deixe assim por enquanto; convém que assim façamos, para cumprir toda a justiça”. E João concordou. Assim que Jesus foi batizado, saiu da água. Naquele momento o céu se abriu, e ele viu o Espírito de Deus descendo como pomba e pousando sobre ele. Então uma voz dos céus disse: “Este é o meu Filho amado, em quem me agrado”.",
            },
            {
                title: "Auto-revelação de Jesus nas Bodas de Caná.",
                contemplation: "Jesus transforma água em vinho.",
                verse: "No terceiro dia houve um casamento em Caná da Galiléia. A mãe de Jesus estava ali; Jesus e seus discípulos também haviam sido convidados para o casamento. Tendo acabado o vinho, a mãe de Jesus lhe disse: “Eles não têm mais vinho”. Respondeu Jesus: “Que temos nós em comum, mulher? A minha hora ainda não chegou”. Sua mãe disse aos serviçais: “Façam tudo o que ele lhes mandar”. Ali perto havia seis potes de pedra, do tipo usado pelos judeus para as purificações cerimoniais; em cada pote cabiam entre oitenta e cento e vinte litros. Disse Jesus aos serviçais: “Encham os potes com água”. E os encheram até a borda. Então lhes disse: “Agora, levem um pouco ao encarregado da festa”. Eles assim fizeram, e o encarregado da festa provou a água que fora transformada em vinho, sem saber de onde este viera, embora o soubessem os serviçais que haviam tirado a água. Então chamou o noivo e disse: “Todos servem primeiro o melhor vinho e, depois que os convidados já beberam bastante, o vinho inferior é servido; mas você guardou o melhor até agora”. Este sinal miraculoso, em Caná da Galiléia, foi o primeiro que Jesus realizou. Revelou assim a sua glória, e os seus discípulos creram nele.",
            },
            {
                title: "Anúncio do Reino de Deus.",
                contemplation: "Jesus anuncia o Reino de Deus e convida à conversão.",
                verse: "Depois que João foi preso, Jesus foi para a Galiléia, proclamando as boas novas de Deus. “O tempo é chegado”, dizia ele. “O Reino de Deus está próximo. Arrependam-se e creiam nas boas novas!”",
            },
            {
                title: "Transfiguração de Jesus.",
                contemplation: "Jesus se transfigura no monte Tabor.",
                verse: "Seis dias depois, Jesus tomou consigo Pedro, Tiago e João, irmão de Tiago, e os levou, em particular, a um alto monte. Ali ele foi transfigurado diante deles. Sua face brilhou como o sol, e suas roupas se tornaram brancas como a luz. Naquele mesmo momento apareceram diante deles Moisés e Elias, conversando com Jesus. Então Pedro disse a Jesus: “Senhor, é bom estarmos aqui. Se quiseres, farei três tendas: uma para ti, uma para Moisés e outra para Elias”. Enquanto ele ainda estava falando, uma nuvem resplandecente os envolveu, e dela saiu uma voz, que dizia: “Este é o meu Filho amado em quem me agrado. Ouçam-no!” Ouvindo isso, os discípulos prostraram-se com o rosto em terra e ficaram aterrorizados. Mas Jesus se aproximou, tocou neles e disse: “Levantem-se! Não tenham medo!” E erguendo eles os olhos, não viram mais ninguém a não ser Jesus. Enquanto desciam do monte, Jesus lhes ordenou: “Não contem a ninguém o que vocês viram, até que o Filho do homem tenha sido ressuscitado dos mortos”.",
            },
            {
                title: "Instituição da Eucaristia.",
                contemplation: "Jesus institui a Eucaristia na Última Ceia.",
                verse: "Quando chegou a hora, Jesus e os seus apóstolos reclinaram-se à mesa. E lhes disse: “Desejei ansiosamente comer esta Páscoa com vocês antes de sofrer. Pois eu lhes digo: Não comerei dela novamente até que se cumpra no Reino de Deus”. Recebendo um cálice, ele deu graças e disse: “Tomem isto e partilhem uns com os outros. Pois eu lhes digo que não beberei outra vez do fruto da videira até que venha o Reino de Deus”. Tomando o pão, deu graças, partiu-o e o deu aos discípulos, dizendo: “Isto é o meu corpo dado em favor de vocês; façam isto em memória de mim”. Da mesma forma, depois da ceia, tomou o cálice, dizendo: “Este cálice é a nova aliança no meu sangue, derramado em favor de vocês.",
            }
        ]
    }
}

const dayToMysteryMap: Record<string, keyof typeof allMysteries> = {
    "segunda-feira": "Gozosos",
    "terça-feira": "Dolorosos",
    "quarta-feira": "Gloriosos",
    "quinta-feira": "Luz",
    "sexta-feira": "Dolorosos",
    "sábado": "Gozosos",
    "domingo": "Gloriosos"
}

export default function PrayRosaryPage() {
    const [day, setDay] = useState<string>("")
    const [currentMystery, setCurrentMystery] = useState<keyof typeof allMysteries>("Gozosos")

    useEffect(() => {
        const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date()).toLowerCase()
        const mapped = dayToMysteryMap[weekday as keyof typeof dayToMysteryMap] || "Gozosos"
        setDay(weekday)
        setCurrentMystery(mapped)
    }, [])

    const getMysteryBorderColor = (mystery: string) => {
        const colors = {
            "Luz": "border-l-yellow-500",
            "Gozosos": "border-l-blue-500",
            "Dolorosos": "border-l-red-500",
            "Gloriosos": "border-l-purple-500"
        }
        return colors[mystery as keyof typeof colors] || colors.Gozosos
    }

    const getMysteryBgColor = (mystery: string) => {
        const colors = {
            "Luz": "bg-yellow-50 dark:bg-yellow-950/10",
            "Gozosos": "bg-blue-50 dark:bg-blue-950/10",
            "Dolorosos": "bg-red-50 dark:bg-red-950/10",
            "Gloriosos": "bg-purple-50 dark:bg-purple-950/10"
        }
        return colors[mystery as keyof typeof colors] || colors.Gozosos
    }

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-12">
                {/* Hero */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-foreground">
                        Santo Terço
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Meditação dos mistérios da vida de Jesus e de Maria, em união com a Igreja.
                    </p>
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 text-sm">
                        <span className="capitalize text-muted-foreground">{day}</span>
                        <span className="text-muted-foreground/60" aria-hidden>·</span>
                        <span className={`font-semibold px-3 py-1.5 rounded-full ${getMysteryBgColor(currentMystery)} shadow-sm`}>
                            {allMysteries[currentMystery].title}
                        </span>
                    </div>
                </header>

                <Tabs value={currentMystery} onValueChange={(val) => setCurrentMystery(val as keyof typeof allMysteries)} className="space-y-8">
                    <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto h-11 bg-muted/50 p-1 rounded-lg">
                        <TabsTrigger value="Luz" className="rounded-md text-sm font-medium data-[state=active]:shadow-sm">Luz</TabsTrigger>
                        <TabsTrigger value="Gozosos" className="rounded-md text-sm font-medium data-[state=active]:shadow-sm">Gozosos</TabsTrigger>
                        <TabsTrigger value="Dolorosos" className="rounded-md text-sm font-medium data-[state=active]:shadow-sm">Dolorosos</TabsTrigger>
                        <TabsTrigger value="Gloriosos" className="rounded-md text-sm font-medium data-[state=active]:shadow-sm">Gloriosos</TabsTrigger>
                    </TabsList>

                    {Object.entries(allMysteries).map(([key, group]) => (
                        <TabsContent value={key} key={key} className="space-y-6 mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-xl border ${getMysteryBorderColor(key)} bg-card overflow-hidden`}
                            >
                                <div className={`px-6 py-5 ${getMysteryBgColor(key)}`}>
                                    <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Medite cada mistério enquanto reza as dez Ave-Marias
                                    </p>
                                </div>
                            </motion.div>

                            <div className="space-y-3">
                                {group.mysteries.map((m, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                                    >
                                        <Card className={`border-l-4 ${getMysteryBorderColor(key)} overflow-hidden transition-shadow hover:shadow-md`}>
                                            <Accordion type="single" collapsible>
                                                <AccordionItem value={`mystery-${idx}`} className="border-0">
                                                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/30">
                                                        <div className="flex items-center gap-4 text-left">
                                                            <span className={`flex-shrink-0 w-9 h-9 rounded-full ${getMysteryBgColor(key)} border-2 border-background flex items-center justify-center font-bold text-sm shadow-sm`}>
                                                                {idx + 1}
                                                            </span>
                                                            <span className="font-semibold text-base leading-snug">{m.title}</span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-5 pb-5 pt-0">
                                                        <div className="space-y-5">
                                                            <section className={`${getMysteryBgColor(key)} rounded-lg p-4`}>
                                                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contemplação</p>
                                                                <p className="text-sm leading-relaxed">{m.contemplation}</p>
                                                            </section>
                                                            <section className="border-l-2 border-primary/30 pl-4">
                                                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Passagem bíblica</p>
                                                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{m.verse}</p>
                                                            </section>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Como Rezar */}
                <section className="space-y-8 pt-4 border-t border-border/60">
                    <header className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight">Como Rezar o Terço</h2>
                        <p className="text-muted-foreground text-sm md:text-base">Estrutura do terço em três momentos</p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-5">
                        <Card className="border border-border/60 overflow-hidden">
                            <CardHeader className="bg-muted/40 py-4">
                                <h3 className="text-base font-bold">Início</h3>
                            </CardHeader>
                            <CardContent className="pt-4 pb-5">
                                <ol className="space-y-3 text-sm">
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">1</span>
                                        <div>
                                            <p className="font-semibold">Sinal da Cruz</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Em nome do Pai, do Filho e do Espírito Santo</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">2</span>
                                        <div>
                                            <p className="font-semibold">Creio em Deus Pai</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Profissão de fé</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">3</span>
                                        <div>
                                            <p className="font-semibold">1 Pai Nosso</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Na conta grande</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">4</span>
                                        <div>
                                            <p className="font-semibold">3 Ave Marias</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Nas contas pequenas</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">5</span>
                                        <div>
                                            <p className="font-semibold">1 Glória ao Pai</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Antes dos mistérios</p>
                                        </div>
                                    </li>
                                </ol>
                            </CardContent>
                        </Card>

                        <Card className="border border-border/60 overflow-hidden">
                            <CardHeader className="bg-muted/40 py-4">
                                <h3 className="text-base font-bold">Cada Mistério</h3>
                            </CardHeader>
                            <CardContent className="pt-4 pb-5">
                                <p className="text-muted-foreground text-sm mb-4">Repita 5 vezes (um por mistério):</p>
                                <ul className="space-y-2.5 text-sm">
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">•</span>
                                        <span>Anunciar o mistério</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">•</span>
                                        <span>1 Pai Nosso</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">•</span>
                                        <span>10 Ave Marias</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">•</span>
                                        <span>1 Glória ao Pai</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">•</span>
                                        <span>Jaculatória</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border border-border/60 overflow-hidden">
                            <CardHeader className="bg-muted/40 py-4">
                                <h3 className="text-base font-bold">Conclusão</h3>
                            </CardHeader>
                            <CardContent className="pt-4 pb-5">
                                <ol className="space-y-3 text-sm">
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">6</span>
                                        <div>
                                            <p className="font-semibold">Salve Rainha</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Oração final mariana</p>
                                        </div>
                                    </li>
                                </ol>
                                <p className="mt-5 pt-4 border-t border-border/60 text-xs text-muted-foreground italic leading-relaxed">
                                    O terço completo tem cerca de 15–20 minutos de oração.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orações */}
                    <Card className="border border-border/60 overflow-hidden">
                        <CardHeader className="bg-muted/30 py-5">
                            <h3 className="text-xl font-bold">Orações do Terço</h3>
                            <p className="text-sm text-muted-foreground mt-1">Toque para expandir e ver o texto completo</p>
                        </CardHeader>
                        <CardContent className="pt-4 pb-6">
                            <Accordion type="single" collapsible className="space-y-3">
                                <AccordionItem value="credo" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Creio em Deus Pai (Credo)</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, de onde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="pai-nosso" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Pai Nosso</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Pai nosso, que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="ave-maria" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Ave Maria</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="gloria" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Glória ao Pai</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="jaculatoria" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Jaculatória (Oração de Fátima)</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente aquelas que mais precisarem.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="jaculatoria-final" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Jaculatória Final (Opcional)</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Infinitas graças vos damos, ó Soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos maternais. Dignai-vos, agora e para sempre tomar-nos debaixo do vosso poderoso amparo e para mais vos agradecer, vos saudamos com uma Salve Rainha:
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="salve-rainha" className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                                        <span className="font-semibold">Salve Rainha</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <p className="text-sm leading-relaxed">
                                                Salve Rainha, Mãe de misericórdia, vida, doçura, esperança nossa, salve! A vós bradamos os degredados filhos de Eva, a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, Advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce e sempre Virgem Maria. Rogai por nós Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
