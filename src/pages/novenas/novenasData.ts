export interface Novena {
    id: string;
    titulo: string;
    subtitulo?: string;
    descricao: string;
    tipo?: 'novena' | 'via-sacra';
    dias?: {
        dia: number;
        titulo?: string;
        oracao: string[];
    }[];
    estacoes?: {
        numero: number;
        titulo: string;
        versiculo: string[];
        oracao: string[];
        refrao: string[];
    }[];
    oracaoFinal?: string[];
}

export const novenasData: Novena[] = [
    {
        id: "nossa-senhora-aparecida",
        titulo: "Novena a Nossa Senhora Aparecida",
        subtitulo: "Padroeira do Brasil",
        descricao: "Novena à Nossa Senhora da Conceição Aparecida, Padroeira do Brasil, para pedir sua intercessão e proteção.",
        dias: [
            {
                dia: 1,
                titulo: "Primeiro Dia - Fé",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste primeiro dia de novena, venho pedir-vos o dom da fé. Ajudai-me a crer em Deus com todo o meu coração, a confiar em sua providência e a seguir os ensinamentos de Jesus Cristo.",
                    "",
                    "Ó Mãe querida, vós que fostes encontrada nas águas do Rio Paraíba, mostrai-me o caminho da fé verdadeira. Fazei que eu creia firmemente nas promessas de Deus e que nunca duvide de seu amor por mim.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu tenha uma fé forte e inabalável, capaz de mover montanhas e de superar todas as dificuldades da vida.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 2,
                titulo: "Segundo Dia - Esperança",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste segundo dia de novena, venho pedir-vos o dom da esperança. Ajudai-me a nunca desanimar diante das dificuldades e a sempre confiar na misericórdia divina.",
                    "",
                    "Ó Mãe querida, vós que sois a Estrela da Esperança, iluminai meu caminho nas horas de trevas. Fazei que eu nunca perca a esperança na vida eterna e nas promessas de salvação.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu tenha sempre a certeza de que Deus está comigo e que nunca me abandonará.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 3,
                titulo: "Terceiro Dia - Caridade",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste terceiro dia de novena, venho pedir-vos o dom da caridade. Ajudai-me a amar a Deus sobre todas as coisas e ao próximo como a mim mesmo.",
                    "",
                    "Ó Mãe querida, vós que sois o exemplo perfeito de amor e doação, ensinai-me a amar como Jesus amou. Fazei que meu coração seja generoso e compassivo com todos, especialmente com os mais necessitados.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu saiba perdoar, ajudar e consolar aqueles que sofrem.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 4,
                titulo: "Quarto Dia - Família",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste quarto dia de novena, venho pedir-vos proteção para minha família. Abençoai meu lar e todos os que nele habitam.",
                    "",
                    "Ó Mãe querida, vós que fostes Mãe na Sagrada Família de Nazaré, guardai minha família sob vosso manto protetor. Dai-nos paz, união e amor verdadeiro.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que minha família seja um lugar de fé, esperança e caridade, onde o nome de Deus seja sempre bendito.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 5,
                titulo: "Quinto Dia - Saúde",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste quinto dia de novena, venho pedir-vos o dom da saúde. Intercedei por mim e por todos os enfermos que necessitam de cura.",
                    "",
                    "Ó Mãe querida, vós que sois Saúde dos Enfermos, olhai com misericórdia para aqueles que sofrem no corpo e na alma. Levai suas súplicas a Jesus, o Divino Médico.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu tenha saúde física, mental e espiritual, e possa usar minhas forças para servir a Deus e aos irmãos.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 6,
                titulo: "Sexto Dia - Trabalho",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste sexto dia de novena, venho pedir-vos proteção em meu trabalho. Abençoai minhas atividades e ajudai-me a encontrar dignidade no labor diário.",
                    "",
                    "Ó Mãe querida, vós que conhecestes o trabalho humilde em Nazaré, intercedei por todos os trabalhadores. Dai-nos força, sabedoria e honestidade em nosso trabalho.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu tenha oportunidades de trabalho digno e possa sustentar minha família com honra.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 7,
                titulo: "Sétimo Dia - Paz",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste sétimo dia de novena, venho pedir-vos o dom da paz. Que a paz de Cristo reine em meu coração, em minha família e em todo o mundo.",
                    "",
                    "Ó Mãe querida, vós que sois Rainha da Paz, intercedei para que cessem as guerras, as violências e todas as formas de discórdia. Fazei que os homens vivam como irmãos.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu seja instrumento de paz onde houver ódio, de amor onde houver ofensa, de união onde houver discórdia.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 8,
                titulo: "Oitavo Dia - Conversão",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste oitavo dia de novena, venho pedir-vos a graça da conversão. Ajudai-me a abandonar o pecado e a viver segundo a vontade de Deus.",
                    "",
                    "Ó Mãe querida, vós que sois Refúgio dos Pecadores, intercedei por todos aqueles que se afastaram de Deus. Levai-os de volta ao caminho da salvação.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu tenha um coração contrito e humilhado, pronto para receber o perdão divino e começar uma vida nova.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            },
            {
                dia: 9,
                titulo: "Nono Dia - Graças Especiais",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Ó Maria Imaculada, Mãe de Deus e nossa Mãe, que sob o título de Nossa Senhora Aparecida sois a Padroeira do Brasil, eu vos saúdo com todo o amor e respeito.",
                    "",
                    "Neste nono e último dia de novena, venho apresentar-vos minhas necessidades particulares e pedir-vos as graças de que tanto necessito.",
                    "",
                    "Ó Mãe querida, vós que nunca abandonastes aqueles que a vós recorrem, olhai com bondade para mim. Apresentai a Jesus minhas súplicas e alcançai-me as graças que vos peço, se forem para o bem de minha alma.",
                    "",
                    "Intercedei por mim junto a vosso Filho Jesus, para que eu seja fiel discípulo do Evangelho e um dia possa louvar-vos eternamente no céu.",
                    "",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!",
                    "Nossa Senhora Aparecida, rogai por nós!"
                ]
            }
        ],
        oracaoFinal: [
            "Oração Final",
            "",
            "Ó Incomparável Senhora da Conceição Aparecida, Mãe de Deus, Rainha dos Anjos, Advogada dos pecadores, Refúgio e Consolação dos aflitos e atribulados.",
            "",
            "Ó Santíssima Virgem, estendei sobre mim o vosso manto protetor, livrai-me de todo o mal e alcançai-me de vosso Santíssimo Filho a graça que ardentemente vos suplico nesta novena.",
            "",
            "Ajudai-me, ó Mãe querida, a viver sempre na graça de Deus e a cumprir fielmente os meus deveres. Amparai-me na hora da morte, para que salvo eternamente, possa louvar-vos e cantar-vos as glórias no Céu. Amém.",
            "",
            "Nossa Senhora Aparecida, rogai por nós!",
            "Nossa Senhora Aparecida, rogai por nós!",
            "Nossa Senhora Aparecida, rogai por nós!"
        ]
    },
    {
        id: "sao-jose",
        titulo: "Novena a São José",
        subtitulo: "Padroeiro da Igreja Universal",
        descricao: "Novena ao glorioso São José, esposo de Maria Santíssima e pai adotivo de Jesus, Padroeiro da Igreja Universal.",
        dias: [
            {
                dia: 1,
                titulo: "Primeiro Dia - São José, Homem Justo",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, escolhido por Deus para ser o esposo virginal de Maria e o pai adotivo de Jesus, vós fostes chamado de homem justo pelas Sagradas Escrituras.",
                    "",
                    "Neste primeiro dia de novena, venho pedir-vos a graça de viver sempre na justiça e na retidão. Ajudai-me a ser justo em meus pensamentos, palavras e ações.",
                    "",
                    "Vós que fostes modelo de obediência à vontade de Deus, ensinai-me a cumprir fielmente os mandamentos divinos e a buscar sempre a santidade.",
                    "",
                    "São José, homem justo e santo, intercedei por mim junto a Jesus e Maria, para que eu seja digno de vossa proteção e alcance as graças que vos peço nesta novena.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 2,
                titulo: "Segundo Dia - São José, Esposo de Maria",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós fostes escolhido por Deus para ser o esposo virginal da Santíssima Virgem Maria, a Mãe de Deus.",
                    "",
                    "Neste segundo dia de novena, venho pedir-vos a graça de amar e respeitar a pureza e a castidade. Ajudai-me a viver segundo os valores do Evangelho.",
                    "",
                    "Vós que protegestes e amparaste Maria em todas as circunstâncias, ensinai-me a honrar e respeitar todas as mulheres, especialmente as mães.",
                    "",
                    "São José, esposo castíssimo de Maria, intercedei por mim junto a Jesus e Maria, para que eu viva sempre na graça de Deus.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 3,
                titulo: "Terceiro Dia - São José, Pai de Jesus",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós fostes escolhido por Deus para ser o pai adotivo de Jesus Cristo, o Filho de Deus feito homem.",
                    "",
                    "Neste terceiro dia de novena, venho pedir-vos a graça de ser um bom pai/mãe, educador e exemplo para aqueles que Deus confiou aos meus cuidados.",
                    "",
                    "Vós que criastes Jesus com tanto amor e dedicação, ensinai-me a educar na fé e no amor de Deus.",
                    "",
                    "São José, pai zeloso de Jesus, intercedei por mim junto a Jesus e Maria, para que eu saiba cumprir minha missão com fidelidade.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 4,
                titulo: "Quarto Dia - São José, Trabalhador",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós fostes um humilde carpinteiro que sustentastes a Sagrada Família com vosso trabalho honesto e digno.",
                    "",
                    "Neste quarto dia de novena, venho pedir-vos a graça de encontrar dignidade e santificação no trabalho. Abençoai minhas atividades profissionais.",
                    "",
                    "Vós que ensinastes a Jesus o ofício de carpinteiro, ajudai-me a trabalhar com honestidade, dedicação e amor.",
                    "",
                    "São José, operário fiel, intercedei por mim junto a Jesus e Maria, para que eu tenha trabalho digno e possa sustentar minha família.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 5,
                titulo: "Quinto Dia - São José, Protetor da Igreja",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós fostes constituído por Deus como Padroeiro da Igreja Universal, para protegê-la e guiá-la.",
                    "",
                    "Neste quinto dia de novena, venho pedir-vos proteção para a Santa Igreja. Guardai o Papa, os bispos, sacerdotes e todos os fiéis.",
                    "",
                    "Vós que protegestes Jesus e Maria dos perigos, protegei também a Igreja de todos os males e perseguições.",
                    "",
                    "São José, protetor da Igreja, intercedei por mim junto a Jesus e Maria, para que eu seja sempre fiel à Igreja e aos seus ensinamentos.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 6,
                titulo: "Sexto Dia - São José, Terror dos Demônios",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós sois o terror dos demônios e o protetor contra todas as forças do mal.",
                    "",
                    "Neste sexto dia de novena, venho pedir-vos proteção contra as tentações e as ciladas do inimigo. Livrai-me de todo o mal.",
                    "",
                    "Vós que defendestes Jesus das ameaças de Herodes, defendei-me também das armadilhas do demônio.",
                    "",
                    "São José, terror dos demônios, intercedei por mim junto a Jesus e Maria, para que eu vença todas as tentações e viva sempre na graça de Deus.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 7,
                titulo: "Sétimo Dia - São José, Modelo de Obediência",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós fostes modelo perfeito de obediência à vontade de Deus, cumprindo fielmente tudo o que Ele vos pedia.",
                    "",
                    "Neste sétimo dia de novena, venho pedir-vos a graça da obediência. Ajudai-me a aceitar e cumprir a vontade de Deus em minha vida.",
                    "",
                    "Vós que obedecestes prontamente ao anjo do Senhor, ensinai-me a ouvir e seguir a voz de Deus.",
                    "",
                    "São José, modelo de obediência, intercedei por mim junto a Jesus e Maria, para que eu seja dócil à vontade divina.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 8,
                titulo: "Oitavo Dia - São José, Patrono da Boa Morte",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós tivestes a graça de morrer nos braços de Jesus e Maria, tendo uma morte santa e preciosa.",
                    "",
                    "Neste oitavo dia de novena, venho pedir-vos a graça de uma boa morte. Assisti-me na hora de minha morte e livrai-me da condenação eterna.",
                    "",
                    "Vós que fostes assistido por Jesus e Maria, alcançai-me a graça de morrer em estado de graça, arrependido de meus pecados.",
                    "",
                    "São José, patrono da boa morte, intercedei por mim junto a Jesus e Maria, para que eu esteja preparado para o encontro com Deus.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            },
            {
                dia: 9,
                titulo: "Nono Dia - São José, Intercessor Poderoso",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Glorioso São José, vós sois um intercessor poderosíssimo junto a Jesus e Maria, e nunca deixastes de atender aqueles que a vós recorrem.",
                    "",
                    "Neste nono e último dia de novena, venho apresentar-vos todas as minhas necessidades e pedir-vos as graças de que tanto preciso.",
                    "",
                    "Vós que nunca abandonastes aqueles que vos invocam, olhai com bondade para mim e alcançai-me as graças que vos peço, se forem para o bem de minha alma.",
                    "",
                    "São José, intercessor poderoso, intercedei por mim junto a Jesus e Maria, para que eu seja atendido em minhas súplicas e possa louvar-vos eternamente no céu.",
                    "",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!",
                    "São José, rogai por nós!"
                ]
            }
        ],
        oracaoFinal: [
            "Oração Final a São José",
            "",
            "Ó glorioso São José, esposo de Maria e pai adotivo de Jesus, eu vos escolho hoje como meu pai, protetor e advogado. Firme é meu propósito de nunca vos esquecer e de honrar-vos todos os dias de minha vida.",
            "",
            "Alcançai-me de Deus a graça de viver sempre em seu santo amor e de morrer em sua santa graça. Protegei-me e livrai-me de todo o mal. Amparai-me nas necessidades e consolai-me nas aflições.",
            "",
            "Assisti-me na hora de minha morte, para que, salvo eternamente, possa louvar-vos e bendizer-vos no Céu, juntamente com Jesus e Maria. Amém.",
            "",
            "São José, rogai por nós!",
            "São José, rogai por nós!",
            "São José, rogai por nós!"
        ]
    },
    {
        id: "sao-carlo-acutis",
        titulo: "Novena a São Carlo Acutis",
        subtitulo: "Anjo da Juventude",
        descricao: "Novena ao jovem santo Carlo Acutis, patrono da internet e modelo de santidade para os jovens. A novena consiste em oração inicial, meditação do dia, 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias (em honra aos 15 anos de vida de Carlo), e oração final.",
        dias: [
            {
                dia: 1,
                titulo: "Primeiro Dia - Não eu, mas Deus",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Primeiro Dia",
                    "\"Não eu, mas Deus\"",
                    "",
                    "São Carlo Acutis, que fizeste de tua vida uma contínua renúncia e aniquilamento, dá-me a graça de buscar as coisas do Céu e desprezar as que passam. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 2,
                titulo: "Segundo Dia - Estar sempre junto com Jesus",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Segundo Dia",
                    "\"Estar sempre junto com Jesus: este é o meu plano de vida\"",
                    "",
                    "São Carlo Acutis, que viveste imerso no Coração de Jesus, dá-me a graça de realizar, em tudo, este teu plano de amor. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 3,
                titulo: "Terceiro Dia - O Anjo da Guarda",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Terceiro Dia",
                    "\"Peça ao seu Anjo da Guarda para ajudá-lo continuamente, de modo que ele se torne seu melhor amigo.\"",
                    "",
                    "São Carlo Acutis, que buscaste, já neste mundo, a companhia dos santos anjos, dá-me a graça de viver na retidão que o meu santo anjo deseja. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 4,
                titulo: "Quarto Dia - A Confissão",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Quarto Dia",
                    "\"Nossa alma é como um balão... Se por acaso existe um pecado mortal, a alma cai sobre a Terra e a confissão será como fogo... É preciso confessar-se frequentemente.\"",
                    "",
                    "São Carlo Acutis, que tão bem viveste o sacramento da reconciliação, dá-me a graça de buscá-lo sempre com uma contrição profunda. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 5,
                titulo: "Quinto Dia - A Felicidade",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Quinto Dia",
                    "\"A tristeza é a visão voltada para si; a felicidade é seu olhar para Deus.\"",
                    "",
                    "São Carlo Acutis, que jamais desviaste o teu olhar de Jesus, teu grande amor, dá-me a graça de viver já neste mundo esta verdadeira felicidade. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 6,
                titulo: "Sexto Dia - A Santidade",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Sexto Dia",
                    "\"A única coisa que nós temos que pedir a Deus na oração é a vontade de ser santos\"",
                    "",
                    "São Carlo Acutis, que soubeste sempre pedir a Deus o essencial, dá-me a graça de um profundo desejo do Céu. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 7,
                titulo: "Sétimo Dia - A Virgem Maria",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Sétimo Dia",
                    "\"A Virgem Maria é a única mulher da minha vida\"",
                    "",
                    "São Carlo Acutis, que amaste a Virgem Maria mais que tudo, dá-me a graça de corresponder ao amor desta tão terna e boa mãe. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 8,
                titulo: "Oitavo Dia - A Eucaristia",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Oitavo Dia",
                    "\"A Eucaristia é a minha estrada para o Céu\"",
                    "",
                    "São Carlo Acutis, que buscavas sempre teu Jesus escondido no sacrário, dá-me a graça de um profundo ardor eucarístico. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            },
            {
                dia: 9,
                titulo: "Nono Dia - A Perseverança Final",
                oracao: [
                    "Oração Inicial",
                    "",
                    "Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço por todos os favores e todas as graças com que enriquecestes a alma de São Carlo Acutis durante os 15 anos que passou nesta Terra e, pelos méritos deste tão querido Anjo da Juventude, vos suplico que me concedais a graça que ardentemente vos peço:",
                    "",
                    "(Faz-se o pedido da graça que se deseja)",
                    "",
                    "Meditação do Nono Dia",
                    "\"Eu estou feliz de morrer, porque vivi a minha vida sem perder nenhum minuto em coisas que não agradam a Deus\"",
                    "",
                    "São Carlo Acutis, dá-me a graça das graças, que é a perseverança final e uma morte santa. Amém.",
                    "",
                    "Rezar: 5 Pai-Nossos, 5 Ave-Marias e 5 Glórias ao Pai",
                    "(Em honra dos 15 anos de vida do servo de Deus nesta Terra)"
                ]
            }
        ],
        oracaoFinal: [
            "Oração Final",
            "",
            "Deus Pai de Misericórdia, que elevastes à glória dos altares este vosso servo Carlo Acutis, a fim de que, por ele, vós fôsseis mais glorificado, concedei-nos, pelos méritos dele — que em tudo viveu a vossa vontade —, a graça que ardentemente desejo. Amém."
        ]
    },
    {
        id: "sao-francisco-de-assis",
        titulo: "Novena a São Francisco de Assis",
        subtitulo: "O Pobrezinho de Assis",
        descricao: "Novena ao glorioso São Francisco de Assis, patrono da Itália e dos animais. A novena consiste em: sinal da cruz, oração para todos os dias, oração de cada dia, 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai, meditação de um texto do Novo Testamento, e oração e bênção de São Francisco.",
        dias: [
            {
                dia: 1,
                titulo: "Primeiro Dia - A Alegria",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Primeiro Dia",
                    "",
                    "Meu amigo e protetor São Francisco, em vossa juventude, cantáveis alegremente pelas ruas de Assis, participando das boas alegrias dos jovens de vossa idade e fazendo grande projetos de conquistas e aventuras, ensinai-me a encontrar a alegria que vem de Deus e fazer-me nela viver continuamente.",
                    "",
                    "Afastai de mim toda a tristeza que me torna fechado ao próximo.",
                    "",
                    "Que a minha alegria e o meu espírito comunicativo deem testemunho da alegre presença de Deus em minha vida.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Jo 6,41-51"
                ]
            },
            {
                dia: 2,
                titulo: "Segundo Dia - A Conversão",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Segundo Dia",
                    "",
                    "Meu amigo e protetor São Francisco, o encontro com um leproso, a quem fostes beijar e a quem destes generosa esmola, num gesto de autossuperação, marcou o começo de vossa conversão e da vida maravilhosa, que, a partir de então, iniciastes, causando admiração ao mundo inteiro. Pelo vosso espírito de renúncia e penitência, ensinai-me a vencer as paixões e más inclinações, canalizando essas energias para o caminho do bem, a fim de que alcance minha plena realização humana, na perfeição a que Deus me chamou.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Rm 8,18-22"
                ]
            },
            {
                dia: 3,
                titulo: "Terceiro Dia - A Igreja",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Terceiro Dia",
                    "",
                    "Grande patriarca Francisco, conta-se que, na igrejinha de São Damião, enquanto estáveis em oração, o crucifixo vos falou: \"Francisco, vai e restaura a minha Igreja\". Foi uma ordem profética. Com vosso exemplo e com os numerosos seguidores que tivestes ainda em vida, nova aurora despertou para a Igreja. Pelo amor que tivestes à Igreja de Cristo, ensinai-me a ser-lhe fiel, vivendo em união com ele, apoiando-a por palavras e pelo testemunho da Igreja, levando uma vida de verdadeiro cristão.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: 1Cor 12,31;13,4-13"
                ]
            },
            {
                dia: 4,
                titulo: "Quarto Dia - O Amor a Cristo",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Quarto Dia",
                    "",
                    "Ó São Francisco, vós vos tornastes um apaixonado do amor de Cristo e saístes pelo mundo a lamentas que \"o Amor não é amado\", e vos apresentastes aos homens como o \"Amante do Grande Rei\". Livrai-me da indiferença e comunicai-me vosso entusiasmo para que aprenda a amar a Nosso Senhor e saiba encontrá-Lo na natureza e nos acontecimentos de cada dia.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Mc 16,1-8 ou Mt 28,1-10"
                ]
            },
            {
                dia: 5,
                titulo: "Quinto Dia - O Espírito Apostólico",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Quinto Dia",
                    "",
                    "São Francisco, enviastes vossos primeiros discípulos pelo mundo inteiro, a fim de que apregoassem a Boa Nova do Reino de Deus. Alcançai-me do Senhor o espírito apostólico e o zelo missionário, para que me interesse por Sua obra e procure colaborar com a Igreja, a fim de que o Reino de Cristo se estabeleça na Terra.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Mc 9,33-41"
                ]
            },
            {
                dia: 6,
                titulo: "Sexto Dia - A Paixão de Cristo",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Sexto Dia",
                    "",
                    "São Francisco, na contemplação e meditação da Paixão de Nosso Senhor Jesus Cristo, encontrastes vigorosa motivação para vos entregardes a Deus numa vida desprovida de conforto e segurança. Submetestes vosso corpo a rudes penitências para experimentar uma parte dos padecimentos que Cristo enfrentou por amor de nós. A lembrança da Paixão do Senhor vos arrancava sentidas lágrimas de arrependimento e de gratidão. De vós quero aprender a grande lição do Crucificado: que, no sofrimento aceito livremente e por amor, atingimos nossa purificação.",
                    "",
                    "Ensinai-me a aceitar os males e contrariedades que não posso evitar, para, por meio deles, expiar, com Jesus, os males que o pecado inflige ao mundo.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Mc 9,25-30 ou Rm 8,9-13"
                ]
            },
            {
                dia: 7,
                titulo: "Sétimo Dia - A Pobreza",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Sétimo Dia",
                    "",
                    "São Francisco, fostes chamado \"o Pobrezinho de Assis\". Abandonastes os bens e o conforto do mundo e vivestes na maior pobreza para mais perfeitamente imitar a Jesus, que nasceu pobre em Belém e na cruz foi despojado de tudo. Ajudai-me a superar o fascínio e os atrativos que os bens da terra exercem sobre mim. Que saiba repartir do que é meu com os mais necessitados, e assim mereça gozar da liberdade dos filhos de Deus.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Jo 19,31-37 ou Ef 3,8-12.14-19"
                ]
            },
            {
                dia: 8,
                titulo: "Oitavo Dia - A Natureza",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Oitavo Dia",
                    "",
                    "São Francisco, fostes o grande amigo da natureza. No Cântico do Sol, convidastes a todas as criaturas para cantarem louvores a Deus. Para vós, a natureza era o livro aberto onde se leem a bondade e a beleza de Deus, que tudo criou com amor de Pai. Fazei que, para mim, as criaturas não sejam pedras de tropeço, mas degraus que me levem para junto do Criador. Dai-me a graça de não me prender exageradamente às criaturas nem a mim mesmo. E que, de coração livre, possa levantar voo para as alturas do amor de Deus.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Jo 14,1-12 ou 1Pd 2,4-10"
                ]
            },
            {
                dia: 9,
                titulo: "Nono Dia - A Identificação com Cristo",
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
                    "",
                    "Oração para Todos os Dias",
                    "",
                    "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.",
                    "",
                    "Oração do Nono Dia",
                    "",
                    "Meu grande São Francisco, apesar da ingratidão dos homens que se fecham ao amor de Deus, soubestes viver em contínua alegria. Estáveis consciente de que o amor do Pai nos predestinou à felicidade do céu. Tão grande foi vosso amor a Cristo, vossa identificação com o Amado atingiu incomparável perfeição. Ensinai-me a encarar a vida com seriedade e alegria. Quero assumir com amor e alegria as responsabilidades que ele me impõe. Que seja compreensivo e alegre no relacionamento com o próximo. Que não esqueça minha vocação de filho de Deus chamado para servir. Fazei que, a vosso exemplo, eu me deixe arrastar pelo amor de Cristo, caminhando decidido e alegre ao seu encontro, todos os dias da vida.",
                    "",
                    "Rezar: 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
                    "",
                    "Sugestão de Meditação: Mt 15,21-28 ou Rm 16,25-27"
                ]
            }
        ],
        oracaoFinal: [
            "Oração de São Francisco",
            "",
            "Senhor, fazei-me instrumento de vossa paz.",
            "Onde houver ódio, que eu leve o amor.",
            "Onde houver ofensa, que eu leve o perdão.",
            "Onde houver discórdia, que eu leve a união.",
            "Onde houver dúvida, que eu leve a fé.",
            "Onde houver erro, que eu leve a verdade.",
            "Onde houver desespero, que eu leve a esperança.",
            "Onde houver tristeza, que eu leve a alegria.",
            "Onde houver trevas, que eu leve a luz.",
            "",
            "Ó Mestre, fazei que eu procure mais consolar que ser consolado,",
            "compreender que ser compreendido, amar que ser amado.",
            "",
            "Pois é dando que se recebe, é perdoando que se é perdoado",
            "e é morrendo que se vive para a vida eterna.",
            "",
            "Bênção de São Francisco",
            "",
            "O Senhor vos abençoe e vos guarde.",
            "O Senhor vos mostre a Sua face e se compadeça de vós.",
            "Amém.",
            "O Senhor volva Seu rosto para vós e dê a paz.",
            "O Senhor vos abençoe.",
            "Amém.",
            "Que o Senhor Deus, pelos méritos de São Francisco,",
            "vos conceda toda a paz e todo o bem.",
            "Amém."
        ]
    },
    {
        id: "via-sacra",
        titulo: "Via Sacra",
        subtitulo: "O Caminho da Cruz",
        descricao: "Acompanhe Jesus em seu caminho para o Calvário, meditando em cada uma das 15 estações da Via Sacra.",
        tipo: 'via-sacra',
        estacoes: [
            {
                numero: 1,
                titulo: "Jesus é Condenado à Morte",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Pilatos, desejando agradar à multidão, soltou-lhes Barrabás; e, depois de mandar flagelar Jesus, entregou-O para ser crucificado. (Mc 15,15)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 2,
                titulo: "Jesus Toma a Cruz aos Ombros",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Depois de O terem escarnecido, tiraram-Lhe o manto, vestiram-Lhe as Suas roupas e levaram-No para ser crucificado. (Mt 27,31)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 3,
                titulo: "Jesus Cai pela Primeira Vez",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Vinde a Mim, todos os que estais cansados e oprimidos, que Eu hei-de aliviar-vos. Tomai sobre vós o Meu jugo e aprendei de Mim, porque sou manso e humilde de coração e encontrareis descanso para o vosso espírito. Pois o Meu jugo é suave e o Meu fardo é leve. (Mt 11,28-30)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 4,
                titulo: "Jesus Encontra Sua Mãe",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Aquele que fizer a vontade de Deus, esse é que é meu irmão, minha irmã e minha mãe. (Mc 3,35)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 5,
                titulo: "Jesus é Ajudado por Simão de Cirene",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Jesus perguntou: Qual [...] te parece ter sido o próximo daquele homem que caiu nas mãos dos salteadores?",
                    "Respondeu: O que usou de misericórdia para com ele.",
                    "Jesus retorquiu: Vai e faz tu também o mesmo. (Lc 10, 36-37)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 6,
                titulo: "A Verônica Enxuga o Rosto a Jesus",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Ó vós todos que passais pelo caminho,",
                    "olhai e vede",
                    "se existe dor igual",
                    "à dor que Me atormenta. (Lm 1,12)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 7,
                titulo: "Jesus Cai pela Segunda Vez",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Se alguém quiser vir após Mim, negue-se a si mesmo, tome a sua cruz e siga-Me. Na verdade, quem quiser salvar a sua vida, há-de perdê-la; mas, quem perder a sua vida por causa de Mim e do Evangelho, há-de salvá-la. (Mc 8,3-35)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 8,
                titulo: "Jesus Consola as Piedosas Mulheres",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Jesus voltou-se para elas e disse-lhes: Filhas de Jerusalém, não choreis por Mim, chorai antes por vós mesmas e pelos vossos filhos. (Lc 23, 28)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 9,
                titulo: "Jesus Cai pela Terceira Vez",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "E disse-lhes: \"A Minha alma está numa tristeza mortal; ficai aqui e vigiai\". (Mc 14,34)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 10,
                titulo: "Jesus é Despojado das Suas Vestes",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Assim se cumpriu a Escritura, que diz:",
                    "Repartiram entre eles as minhas vestes",
                    "e sobre a minha túnica lançaram sortes. (Jo 19,24)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 11,
                titulo: "Jesus é Crucificado",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Então, Jesus, ao ver ali ao pé a sua mãe e o discípulo que Ele amava, disse à mãe: \"Mulher, eis o teu filho!\"",
                    "Depois, disse ao discípulo: Eis a tua mãe! E, desde aquela hora, o discípulo acolheu-a como sua. (Jo 19, 26-27)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 12,
                titulo: "Jesus Morre na Cruz",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Dando um forte grito, Jesus exclamou: \"Pai, nas Tuas mãos entrego o Meu espírito\". Dito isto, expirou. (Lc 23,46)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 13,
                titulo: "Jesus é Descido da Cruz e Entregue a Sua Mãe",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Uma espada trespassará a tua alma. Assim hão-de revelar-se os pensamentos de muitos corações. (Lc 2,25)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 14,
                titulo: "Jesus é Sepultado",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "[José de Arimateia] foi ter com Pilatos e pediu-lhe o corpo de Jesus.",
                    "Descendo-O da cruz, envolveu-O num lençol e depositou-O num sepulcro talhado na rocha, onde ainda ninguém tinha sido sepultado. (Lc 23,52)"
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            },
            {
                numero: 15,
                titulo: "Jesus Ressuscita como Tinha Dito",
                versiculo: [
                    "V. Nós Vos adoramos e Vos bendizemos, Senhor Jesus.",
                    "R. Porque pela Vossa santa cruz remistes o mundo."
                ],
                oracao: [
                    "Jesus disse [a Maria Madalena]: \"Não Me detenhas, pois ainda não subi para o Pai; mas vai ter com os Meus irmãos e diz-lhes: Subo para o Meu Pai, que é vosso Pai, para o Meu Deus, que é vosso Deus.'\"",
                    "Maria Madalena foi e anunciou aos discípulos: \"Vi o Senhor!\" E contou o que Ele lhe tinha dito. (Jo 20,17-18)."
                ],
                refrao: [
                    "Pai Nosso, Ave Maria, Glória",
                    "Ó santa Mãe da dor, gravai no meu coração as chagas do Salvador."
                ]
            }
        ]
    },
    {
        id: "terco-divina-misericordia",
        titulo: "Terço da Divina Misericórdia",
        subtitulo: "Coroa da Misericórdia",
        descricao: "Terço da Divina Misericórdia revelado a Santa Faustina Kowalska. Reze especialmente às 15h, hora da Misericórdia.",
        tipo: 'via-sacra',
        estacoes: [
            {
                numero: 1,
                titulo: "Sinal da Cruz",
                versiculo: [],
                oracao: [
                    "Em nome do Pai, do Filho e do Espírito Santo. Amém."
                ],
                refrao: []
            },
            {
                numero: 2,
                titulo: "Pai Nosso",
                versiculo: [],
                oracao: [
                    "Pai nosso que estais nos céus,",
                    "santificado seja o vosso nome;",
                    "venha a nós o vosso reino,",
                    "seja feita a vossa vontade,",
                    "assim na terra como no céu.",
                    "O pão nosso de cada dia nos dai hoje;",
                    "perdoai-nos as nossas ofensas,",
                    "assim como nós perdoamos",
                    "a quem nos tem ofendido;",
                    "e não nos deixeis cair em tentação,",
                    "mas livrai-nos do mal. Amém."
                ],
                refrao: []
            },
            {
                numero: 3,
                titulo: "Ave Maria",
                versiculo: [],
                oracao: [
                    "Ave Maria, cheia de graça,",
                    "o Senhor é convosco,",
                    "bendita sois vós entre as mulheres",
                    "e bendito é o fruto do vosso ventre, Jesus.",
                    "Santa Maria, Mãe de Deus,",
                    "rogai por nós pecadores,",
                    "agora e na hora de nossa morte. Amém."
                ],
                refrao: []
            },
            {
                numero: 4,
                titulo: "Credo (Símbolo dos Apóstolos)",
                versiculo: [],
                oracao: [
                    "Creio em Deus Pai todo-poderoso,",
                    "Criador do céu e da terra.",
                    "E em Jesus Cristo, seu único Filho, Nosso Senhor,",
                    "que foi concebido pelo poder do Espírito Santo,",
                    "nasceu da Virgem Maria,",
                    "padeceu sob Pôncio Pilatos,",
                    "foi crucificado, morto e sepultado.",
                    "Desceu à mansão dos mortos,",
                    "ressuscitou ao terceiro dia,",
                    "subiu aos céus,",
                    "está sentado à direita de Deus Pai todo-poderoso,",
                    "donde há de vir a julgar os vivos e os mortos.",
                    "Creio no Espírito Santo,",
                    "na Santa Igreja Católica,",
                    "na comunhão dos santos,",
                    "na remissão dos pecados,",
                    "na ressurreição da carne,",
                    "na vida eterna. Amém."
                ],
                refrao: []
            },
            {
                numero: 5,
                titulo: "Nas Contas Maiores (5 vezes)",
                versiculo: [
                    "Nas contas maiores do Terço, ao rezar o Pai Nosso, reza-se:"
                ],
                oracao: [
                    "Eterno Pai, eu Vos ofereço o Corpo e Sangue, a Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e do mundo inteiro."
                ],
                refrao: []
            },
            {
                numero: 6,
                titulo: "Nas Contas Menores (50 vezes)",
                versiculo: [
                    "Nas contas menores do Terço, ao rezar a Ave Maria, reza-se:"
                ],
                oracao: [
                    "Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro."
                ],
                refrao: []
            },
            {
                numero: 7,
                titulo: "Invocação Final (3 vezes)",
                versiculo: [
                    "No final do terço, reza-se por três vezes:"
                ],
                oracao: [
                    "Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro."
                ],
                refrao: []
            }
        ],
        oracaoFinal: [
            "Oração Conclusiva (Opcional)",
            "",
            "Deus, Pai Misericordioso, que revelou Teu amor em Teu Filho Jesus Cristo, e o derramou sobre nós no Espírito Santo, confiamos-Te hoje o destino do mundo e de cada homem. Dobre-se sobre nós pecadores, cure nossa fraqueza, vença todo o mal, deixe que todos os habitantes da Terra experimentem a Tua misericórdia, para que em Ti, o Deus Trino, possam sempre encontrar a fonte da esperança. Pai Eterno, pela dolorosa Paixão e Ressurreição de Teu Filho, tende piedade de nós e do mundo inteiro. Amém."
        ]
    }
];

