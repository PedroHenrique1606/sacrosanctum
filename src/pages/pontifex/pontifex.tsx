import backgroundImage from "@/assets/pope-leone-sacada.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calendar, MapPin, Cross, Heart, Globe, Users } from "lucide-react";

export default function PontificePage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-16">

            <motion.section
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative h-[500px] md:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="text-center text-white px-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-2">Papa Leão XIV</h1>
                            <p className="text-xl md:text-2xl italic font-serif">Leonem Decimum Quartum</p>
                            <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
                                Primeiro Papa Norte-Americano da História
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-12 px-4 max-w-6xl mx-auto"
            >
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Eleição</h3>
                            </div>
                            <p className="text-2xl font-bold text-primary">8 de Maio</p>
                            <p className="text-sm text-muted-foreground">2025</p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Origem</h3>
                            </div>
                            <p className="text-2xl font-bold text-primary">Chicago</p>
                            <p className="text-sm text-muted-foreground">Estados Unidos</p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Cross className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Nome Civil</h3>
                            </div>
                            <p className="text-lg font-bold text-primary">Robert Francis</p>
                            <p className="text-sm text-muted-foreground">Prevost, O.S.A.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center">Sobre o Santo Padre</h2>
                        <Separator className="mb-6" />
                    </div>
                    
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Papa Leão XIV, nascido <strong className="text-foreground">Robert Francis Prevost</strong> em Chicago, foi eleito ao trono de São Pedro em <strong className="text-foreground">8 de maio de 2025</strong>, tornando-se o <strong className="text-foreground">267º pontífice</strong> da Igreja Católica e o <strong className="text-foreground">primeiro papa norte-americano</strong> da história. Missionário e bispo no Peru por mais de duas décadas, destacou-se pelo serviço aos mais pobres e pela defesa incansável da dignidade humana.
                    </p>
                    
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Inspirado por <strong className="text-foreground">São Leão Magno</strong> e <strong className="text-foreground">Leão XIII</strong>, escolheu seu nome pontifício como um compromisso com a defesa da fé e a promoção da justiça social em tempos de intensas transformações. Desde o início de seu pontificado, tem enfatizado a unidade da Igreja, o acolhimento aos marginalizados e o diálogo inter-religioso.
                    </p>
                    
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Sob sua liderança, a Igreja reafirma seu papel missionário, com ênfase no Evangelho e na tradição apostólica, enquanto enfrenta os desafios éticos e espirituais da contemporaneidade, como a inteligência artificial e as novas dinâmicas sociais globais.
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-muted py-16"
            >
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Prioridades do Pontificado</h2>
                        <Separator className="max-w-xs mx-auto" />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-6 w-6 text-primary" />
                                        <CardTitle className="text-lg">Caridade e Justiça Social</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Defesa incansável dos mais pobres e marginalizados, promovendo a dignidade humana e a justiça social em todo o mundo.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-6 w-6 text-primary" />
                                        <CardTitle className="text-lg">Unidade da Igreja</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Fortalecimento da comunhão entre os fiéis e promoção do diálogo ecumênico e inter-religioso.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-6 w-6 text-primary" />
                                        <CardTitle className="text-lg">Missão Evangelizadora</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Renovação do ardor missionário da Igreja, levando o Evangelho aos desafios contemporâneos.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Frases e Reflexões</h2>
                        <Separator className="max-w-xs mx-auto mb-8" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div 
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full border-primary/20">
                                <CardContent className="p-6">
                                    <div className="text-6xl text-primary/20 mb-2">"</div>
                                    <blockquote className="text-lg italic leading-relaxed mb-4">
                                        O mal não irá prevalecer. Estamos todos nas mãos de Deus. Portanto, sem medo, juntos, de mãos dadas, com Deus e uns com os outros, prossigamos.
                                    </blockquote>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Discurso inaugural, 2025</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full border-primary/20">
                                <CardContent className="p-6">
                                    <div className="text-6xl text-primary/20 mb-2">"</div>
                                    <blockquote className="text-lg italic leading-relaxed mb-4">
                                        Essa é a paz de Cristo ressuscitado. Uma paz desarmada, uma paz 'desarmante', humilde e perseverante, que provém de Deus.
                                    </blockquote>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Mensagem aos fiéis, 2025</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="py-20 bg-gradient-to-b from-background to-muted text-center px-6"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
                            Anúncio Papal
                        </Badge>
                        <h2 className="text-4xl font-bold mb-8">Habemus Papam</h2>
                        <Separator className="max-w-md mx-auto mb-10" />
                        
                        <Card className="border-primary/20 bg-background/50 backdrop-blur">
                            <CardContent className="p-8 md:p-12">
                                <p className="italic text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground leading-relaxed tracking-wide font-serif">
                                    <span className="block text-2xl md:text-3xl text-foreground mb-4 font-semibold">
                                        Annuntio vobis gaudium magnum:
                                    </span>
                                    <span className="block text-3xl md:text-4xl text-primary font-bold mb-8">
                                        Habemus Papam!
                                    </span>
                                    <span className="block text-lg md:text-xl leading-loose">
                                        Eminentissimum ac Reverendissimum Dominum,<br />
                                        Dominum <strong className="text-foreground">Robertum Franciscum</strong>,<br />
                                        Sanctae Romanae Ecclesiae Cardinalem <strong className="text-foreground">Prevost</strong>,<br />
                                        qui sibi nomen imposuit
                                    </span>
                                    <span className="block text-4xl md:text-5xl text-primary font-bold mt-6">
                                        LEONEM XIV
                                    </span>
                                </p>
                            </CardContent>
                        </Card>

                        <div className="mt-12 text-center">
                            <p className="text-sm text-muted-foreground italic">
                                Cidade do Vaticano, 8 de maio de 2025
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    )
}
