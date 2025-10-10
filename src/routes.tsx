import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Liturgia from "./pages/liturgia/liturgia";
import PontificePage from "./pages/pontifex/pontifex";
import ManualConfissao from "./pages/confissao/confissao";
import CalendarioLiturgico from "./pages/calendario-liturgico/calendario-liturgico";
import PrayRosaryPage from "./pages/santo-terco/santo-terco";
import Oracoes from "./pages/oracoes/oracoes";
import TercoDaMisericordia from "./pages/misericordia/misericordia";
import OracoesEucaristicas from "./pages/selecionarOracao/selecionarOracao";
import OracaoEucaristicaDynamic from "./pages/oracaoEucaristica/oracaoEcarustica";
import RitoComunhao from "./pages/ritoComunhao/ritoComunhao";
import SelecionarNovena from "./pages/novenas/selecionarNovena";
import Novena from "./pages/novenas/novena";
import CreditsPage from "./pages/creditos/credits";

export const PATHS = {
    home: "/",
    liturgic: "/liturgia",
    pontifex: "/pontifex",
    confession: "/confissao",
    dateliturgic: "/calendario-liturgico",
    santoterco: "/santo-terco",
    oracoes: "/oracoes",
    misericordia: "/misericordia",
    selecionaroracaoeucaristicas: "/oracoes-eucaristicas",
    oracaoeucaristica: "/oracao-eucaristica/:id",
    ritocomunhao: "/rito-comunhao",
    novenas: "/novenas",
    novena: "/novena/:id",
    credits: "/creditos",
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.home} element={<Navigate to={PATHS.liturgic} />} />
                <Route path={PATHS.liturgic} element={<Liturgia />} />
                <Route path={PATHS.pontifex} element={<PontificePage />} />
                <Route path={PATHS.confession} element={<ManualConfissao />} />
                <Route path={PATHS.dateliturgic} element={<CalendarioLiturgico />} />
                <Route path={PATHS.santoterco} element={<PrayRosaryPage />} />
                <Route path={PATHS.oracoes} element={<Oracoes />} />
                <Route path={PATHS.misericordia} element={<TercoDaMisericordia />} />
                <Route path={PATHS.selecionaroracaoeucaristicas} element={<OracoesEucaristicas />} />
                <Route path={PATHS.oracaoeucaristica} element={<OracaoEucaristicaDynamic />} />
                <Route path={PATHS.ritocomunhao} element={<RitoComunhao />} />
                <Route path={PATHS.novenas} element={<SelecionarNovena />} />
                <Route path={PATHS.novena} element={<Novena />} />
                <Route path={PATHS.credits} element={<CreditsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
