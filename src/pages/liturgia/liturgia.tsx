import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CorLiturgica, LiturgiaDiaResponse } from "@/interfaces/liturgiaTypes";
import { cn } from "@/lib/utils";
import { getLiturgicDay } from "@/services/getLiturgicApi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Liturgia() {
  const [fontSize, setFontSize] = useState("text-base")
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [liturgiaData, setLiturgiaData] = useState<LiturgiaDiaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isVigiliaPascal = liturgiaData?.liturgia === 'Sábado Santo - Vigília Pascal'

  const corClasses: Record<CorLiturgica, string> = {
    Verde: 'bg-green-100 text-green-800',
    Vermelho: 'bg-red-100 text-red-800',
    Roxo: 'bg-purple-100 text-purple-800',
    Rosa: 'bg-pink-100 text-pink-800',
    Branco: 'bg-gray-100 text-gray-800',
  };

  const corLiturgica = liturgiaData?.cor ?? 'Branco';

  function handleShareClick() {
    const link = window.location.href
    navigator.clipboard.writeText(link)
    setCopied(true)
  }

  function increaseFont() {
    setFontSize(prev => prev === "text-base" ? "text-lg" : "text-xl")
  }

  function decreaseFont() {
    setFontSize(prev => prev === "text-xl" ? "text-lg" : "text-base")
  }

  useEffect(() => {
    if (copied) {
      toast.success("Link copiado!");
      setCopied(false);
    }
  }, [copied]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const diaParam = searchParams.get("dia");
    const mesParam = searchParams.get("mes");
    const anoParam = searchParams.get("ano");

    const dia = diaParam || String(new Date().getDate()).padStart(2, "0");
    const mes = mesParam || String(new Date().getMonth() + 1).padStart(2, "0");
    const ano = anoParam || String(new Date().getFullYear());

    const dateFromParams = new Date(Number(ano), Number(mes) - 1, Number(dia));

    if (!isNaN(dateFromParams.getTime())) {
      setSelectedDate(dateFromParams);
    }

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getLiturgicDay(dia, mes, ano);
      if (!data) {
        toast.error("A liturgia desta data ainda não está disponível nesse site");
      }
      setLiturgiaData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dia = String(selectedDate.getDate()).padStart(2, "0");
      const mes = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const ano = String(selectedDate.getFullYear());

      const newUrl = `${window.location.pathname}?dia=${dia}&mes=${mes}&ano=${ano}`;
      window.history.pushState({}, "", newUrl);

      const fetchData = async () => {
        const data = await getLiturgicDay(dia, mes, ano);
        if (!data) {
          toast.error("A liturgia desta data ainda não está disponível nesse site");
        }
        setLiturgiaData(data);
      };

      fetchData();
    }
  }, [selectedDate]);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <p className="font-semibold text-lg sm:text-xl md:text-2xl">
          {liturgiaData?.liturgia ?? "Liturgia não disponível"}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={decreaseFont}
              className="text-sm px-2 py-1 border rounded cursor-pointer"
            >
              A-
            </button>
            <button
              onClick={increaseFont}
              className="text-sm px-2 py-1 border rounded cursor-pointer"
            >
              A+
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={() => {
                    handleShareClick();
                    setOpen(true);
                  }}
                  className="text-sm px-2 py-1 border rounded cursor-pointer"
                  aria-label="Compartilhar"
                >
                  <Share2 size={16} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link copiado!</DialogTitle>
                  <DialogDescription>
                    O link da leitura foi copiado para sua área de transferência. Agora você pode colar e compartilhar com quem quiser.
                  </DialogDescription>
                </DialogHeader>
                <input
                  readOnly
                  value={window.location.href}
                  className="w-full mt-4 p-2 border rounded text-sm"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Escolher data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${corClasses[corLiturgica]}`}
        >
          Cor Litúrgica: {corLiturgica}
        </span>
      </div>
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200/50 rounded w-1/2" />
          <div className="h-4 bg-gray-200/50 rounded w-full" />
          <div className="h-4 bg-gray-200/50 rounded w-11/12" />
          <div className="h-4 bg-gray-200/50 rounded w-10/12" />
          <div className="h-4 bg-gray-200/50 rounded w-9/12" />
          <div className="h-6 bg-gray-300/50 rounded w-2/3 mt-6" />
          <div className="h-4 bg-gray-200/50 rounded w-full" />
          <div className="h-4 bg-gray-200/50 rounded w-11/12" />
        </div>
      ) : (
        isVigiliaPascal ? (
          <Tabs defaultValue="exulte" className="w-full">
            <div className="flex justify-between items-center mb-4 text-2xl md:text-lg">
              <TabsList className="grid grid-cols-5 gap-1 w-full">
                <TabsTrigger className="text-xs md:text-sm" value="exulte">Exulte</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="leituras">Leituras AT</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="epistola">Epístola</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="evangelho">Evangelho</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="oracoes">Orações</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="exulte" className={`${fontSize} space-y-6`}>
              {liturgiaData?.oracoes.extras?.find(e => e.titulo === "Benção do fogo") && (
                <div className="pb-6 border-b">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 px-4 py-3 rounded-r-lg mb-6">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                      Celebração da Luz - Benção do Fogo Novo
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {liturgiaData.oracoes.extras.find(e => e.titulo === "Benção do fogo")?.titulo}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {liturgiaData.oracoes.extras.find(e => e.titulo === "Benção do fogo")?.texto}
                  </p>
                </div>
              )}
              {liturgiaData?.leituras.extras?.find(e => e.titulo === "Proclamação da Páscoa (Exulte)") && (
                <div className="pt-6">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 px-4 py-3 rounded-r-lg mb-6">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                      Proclamação da Páscoa - Canto solene do diácono ou sacerdote junto ao Círio Pascal
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {liturgiaData.leituras.extras.find(e => e.titulo === "Proclamação da Páscoa (Exulte)")?.titulo}
                  </h2>
                  <div className="leading-relaxed whitespace-pre-line">
                    {liturgiaData.leituras.extras.find(e => e.titulo === "Proclamação da Páscoa (Exulte)")?.texto}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="leituras" className={`${fontSize} space-y-8`}>
              <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 px-4 py-3 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                  Liturgia da Palavra da Vigília Pascal - Leituras do Antigo Testamento
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  Tradição: ao menos 3 leituras devem ser proclamadas, sendo obrigatória a 3ª (Passagem do Mar Vermelho)
                </p>
              </div>

              {liturgiaData?.leituras.primeiraLeitura?.map((leitura, index) => {
                const oracaoIndex = index + 1;
                
                return (
                  <div key={`primeira-${index}`} className="pb-8 border-b-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded">
                        1ª Leitura {index === 1 ? '(Forma Breve)' : '(Forma Longa)'}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">{leitura.referencia}</h2>
                    <p className="italic mb-2">{leitura.titulo}</p>
                    <p className="leading-relaxed whitespace-pre-line mb-4">{leitura.texto}</p>
                    <p className="font-semibold">— Palavra do Senhor.</p>
                    <p>— Graças a Deus.</p>

                    {liturgiaData.leituras.salmo?.[index] && (
                      <div className="mt-6">
                        <div className="mb-4">
                          <h3 className="text-base font-semibold text-primary mb-1">Salmo responsorial</h3>
                          <p className="text-sm text-primary">{liturgiaData.leituras.salmo[index].referencia}</p>
                        </div>
                        <div className="pl-4 border-l-2 border-primary">
                          <p className="mb-3">
                            <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo[index].refrao}
                          </p>
                          {liturgiaData.leituras.salmo[index].texto.split('\n').map((linha, i) => (
                            <div key={i} className="mb-2">
                              <p className="leading-relaxed whitespace-pre-line">{linha.trim()}</p>
                              <p className="mt-2">
                                <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo?.[index]?.refrao}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {liturgiaData.oracoes.extras?.[oracaoIndex] && (
                      <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                          Oremos
                        </p>
                        <p className="leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.extras[oracaoIndex].texto}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {liturgiaData?.leituras.segundaLeitura?.map((leitura, index) => (
                <div key={`segunda-${index}`} className="pb-8 border-b-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded">
                      2ª Leitura (Sacrifício de Isaac)
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                        2ª Leitura {leitura.referencia}
                      </h2>
                      <p className="italic mb-2">{leitura.titulo}</p>
                      <p className="leading-relaxed mt-2 whitespace-pre-line">{leitura.texto}</p>
                      <p className="mt-4 font-semibold pb-2">— Palavra do Senhor.</p>
                      <p>— Graças a Deus.</p>

                  {liturgiaData.oracoes.extras?.[2] && (
                    <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                        Oremos
                      </p>
                      <p className="leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.extras[2].texto}</p>
                    </div>
                  )}
                </div>
              ))}

              {liturgiaData?.leituras.extras?.filter(e => e.tipo && e.tipo !== "Epístola" && e.tipo !== "Proclamação da Páscoa (Exulte)").map((leitura, idx) => {
                const leituraIndex = idx + 3;
                const oracaoIndex = leituraIndex;
                const salmoIndex = leituraIndex;

                return (
                  <div key={`extra-${idx}`} className="pb-8 border-b-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded">
                        {leituraIndex}ª Leitura {leituraIndex === 3 ? '(Obrigatória)' : '(Opcional)'}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">{leitura.referencia}</h2>
                    <p className="italic mb-2">{leitura.titulo}</p>
                    <p className="leading-relaxed whitespace-pre-line mb-4">{leitura.texto}</p>
                    <p className="font-semibold">— Palavra do Senhor.</p>
                    <p>— Graças a Deus.</p>

                    {liturgiaData.leituras.salmo?.[salmoIndex] && (
                      <div className="mt-6">
                        <div className="mb-4">
                          <h3 className="text-base font-semibold text-primary mb-1">Salmo responsorial</h3>
                          <p className="text-sm text-primary">{liturgiaData.leituras.salmo[salmoIndex].referencia}</p>
                        </div>
                        <div className="pl-4 border-l-2 border-primary">
                          <p className="mb-3">
                            <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo[salmoIndex].refrao}
                          </p>
                          {liturgiaData.leituras.salmo[salmoIndex].texto.split('\n').map((linha, i) => (
                            <div key={i} className="mb-2">
                              <p className="leading-relaxed whitespace-pre-line">{linha.trim()}</p>
                              <p className="mt-2">
                                <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo?.[salmoIndex]?.refrao}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {liturgiaData.oracoes.extras?.[oracaoIndex] && (
                      <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                          Oremos
                        </p>
                        <p className="leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.extras[oracaoIndex].texto}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="epistola" className={`${fontSize} space-y-6`}>
              {liturgiaData?.leituras.extras?.filter(e => e.tipo === "Epístola").map((epistola, index) => (
                <div key={`epistola-${index}`}>
                  <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 px-4 py-3 rounded-r-lg mb-6">
                    <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                      Epístola do Novo Testamento - Proclamada após o Glória e antes do Evangelho
                    </p>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{epistola.referencia}</h2>
                  <p className="italic mb-2">{epistola.titulo}</p>
                  <p className="leading-relaxed whitespace-pre-line mb-4">{epistola.texto}</p>
                  <p className="font-semibold">— Palavra do Senhor.</p>
                  <p>— Graças a Deus.</p>

                  {liturgiaData.leituras.salmo?.[liturgiaData.leituras.salmo.length - 1] && (
                      <div className="mt-8 pt-6 border-t">
                        <div className="mb-4">
                          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                            Salmo Pascal
                          </span>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-base font-semibold text-primary mb-1">Salmo responsorial</h3>
                          <p className="text-sm text-primary">
                            {liturgiaData.leituras.salmo[liturgiaData.leituras.salmo.length - 1].referencia}
                          </p>
                        </div>
                        <div className="pl-4 border-l-2 border-primary">
                          <p className="mb-3">
                            <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo[liturgiaData.leituras.salmo.length - 1].refrao}
                          </p>
                          {liturgiaData.leituras.salmo[liturgiaData.leituras.salmo.length - 1].texto.split('\n').map((linha, i) => (
                            <div key={i} className="mb-2">
                              <p className="leading-relaxed whitespace-pre-line">{linha.trim()}</p>
                              <p className="mt-2">
                                <span className="text-primary font-bold">R.</span> {liturgiaData.leituras.salmo?.[liturgiaData.leituras.salmo.length - 1]?.refrao}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="evangelho" className={`${fontSize} space-y-6`}>
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 px-4 py-3 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  Evangelho da Ressurreição do Senhor
                </p>
              </div>
              {liturgiaData?.leituras.evangelho?.map((evangelho, index) => (
                <div key={index}>
                  <h2 className="text-lg font-semibold mb-2">Evangelho {evangelho.referencia}</h2>
                  <p className="italic mb-2">
                    {evangelho.titulo.split(/(✠)/g).map((parte, idx) =>
                      parte === '✠' ? (
                        <span key={idx} className="text-red-600 dark:text-red-400 font-bold text-xl">{parte}</span>
                      ) : (
                        <span key={idx}>{parte}</span>
                      )
                    )}
                  </p>
                  <p>— Glória a vós, Senhor.</p>
                  <p className="leading-relaxed mt-4 whitespace-pre-line">{evangelho.texto}</p>
                  <p className="mt-4 font-semibold">— Palavra da Salvação.</p>
                  <p>— Glória a vós, Senhor.</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="oracoes" className={`${fontSize} space-y-6`}>
              {liturgiaData?.antifonas?.entrada && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Antífona de Entrada</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{liturgiaData.antifonas.entrada}</p>
                </div>
              )}
              
              {liturgiaData?.oracoes.coleta && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Oração Coleta</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.coleta}</p>
                </div>
              )}

              {liturgiaData?.oracoes.oferendas && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Oração sobre as Oferendas</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.oferendas}</p>
                </div>
              )}

              {liturgiaData?.oracoes.comunhao && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Oração da Comunhão</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{liturgiaData.oracoes.comunhao}</p>
                </div>
              )}

              {liturgiaData?.antifonas?.comunhao && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Antífona de Comunhão</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{liturgiaData.antifonas.comunhao}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="primeira" className="w-full">
            <div className="flex justify-between items-center mb-4 text-2xl md:text-lg">
              <TabsList className="grid grid-cols-5 gap-1 w-full">
                <TabsTrigger className="text-xs md:text-sm" value="oracoes">Orações</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="primeira">1ª Leitura</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="salmo">Salmo</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="segunda">2ª Leitura</TabsTrigger>
                <TabsTrigger className="text-xs md:text-sm" value="evangelho">Evangelho</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="oracoes" className={`${fontSize} space-y-6`}>
              <div>
                <h3 className="text-lg font-semibold mb-1">Coleta</h3>
                <p className="leading-relaxed">{liturgiaData?.oracoes.coleta}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Oferendas</h3>
                <p className="leading-relaxed">{liturgiaData?.oracoes.oferendas}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Comunhão</h3>
                <p className="leading-relaxed">{liturgiaData?.oracoes.comunhao}</p>
              </div>
              {liturgiaData?.oracoes.extras?.map((extra, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-1">{extra.titulo}</h3>
                  <p className="leading-relaxed">{extra.texto}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="primeira" className={`${fontSize} space-y-4`}>
              {liturgiaData?.leituras.primeiraLeitura && liturgiaData.leituras.primeiraLeitura.length > 1 && (
                <div className="bg-muted/50 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Há {liturgiaData.leituras.primeiraLeitura.length} opções de leitura disponíveis. O celebrante deve escolher uma delas.
                  </p>
                </div>
              )}
              {liturgiaData?.leituras.primeiraLeitura?.map((leitura, index) => (
                <div key={index} className={`${index > 0 ? 'pt-6 border-t-2 border-dashed border-muted' : ''}`}>
                  {liturgiaData.leituras.primeiraLeitura && liturgiaData.leituras.primeiraLeitura.length > 1 && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        Opção {index + 1}
                      </span>
                    </div>
                  )}
                  <h2 className="text-lg font-semibold mb-2">1ª Leitura {leitura.referencia}</h2>
                  <p className="italic mb-2">{leitura.titulo}</p>
                  <p className="leading-relaxed whitespace-pre-line">{leitura.texto}</p>
                  <p className="mt-4 font-semibold pb-2">— Palavra do Senhor.</p>
                  <p>— Graças a Deus.</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="salmo">
              {liturgiaData?.leituras.salmo && liturgiaData.leituras.salmo.length > 1 && (
                <div className="bg-muted/50 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Há {liturgiaData.leituras.salmo.length} opções de salmo disponíveis. O celebrante deve escolher um deles.
                  </p>
                </div>
              )}
              {liturgiaData?.leituras.salmo?.map((salmos, index) => (
                <div key={index} className={`${fontSize} space-y-3 ${index > 0 ? 'pt-6 border-t-2 border-dashed border-muted' : ''}`}>
                  {liturgiaData.leituras.salmo && liturgiaData.leituras.salmo.length > 1 && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        Opção {index + 1}
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-primary mb-1">Salmo responsorial</h3>
                    <p className="text-sm text-primary">{salmos.referencia}</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary">
                    <p className="mb-3">
                      <span className="text-primary font-bold">R.</span> {salmos.refrao}
                    </p>
                    {salmos.texto.split('\n').map((verso, i) => (
                      <div key={i} className="mb-2">
                        <p className="leading-relaxed whitespace-pre-line">{verso.trim()}</p>
                        <p className="mt-2">
                          <span className="text-primary font-bold">R.</span> {salmos.refrao}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="segunda" className={`${fontSize} space-y-4`}>
              {liturgiaData?.leituras.segundaLeitura && liturgiaData.leituras.segundaLeitura.length > 0 ? (
                <>
                  {liturgiaData.leituras.segundaLeitura.length > 1 && (
                    <div className="bg-muted/50 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-6">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Há {liturgiaData.leituras.segundaLeitura.length} opções de leitura disponíveis. O celebrante deve escolher uma delas.
                      </p>
                    </div>
                  )}
                  {liturgiaData.leituras.segundaLeitura.map((leitura, index) => (
                    <div key={index} className={`${index > 0 ? 'pt-6 border-t-2 border-dashed border-muted' : ''}`}>
                      {liturgiaData.leituras.segundaLeitura && liturgiaData.leituras.segundaLeitura.length > 1 && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                            Opção {index + 1}
                          </span>
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <h2 className="text-xl font-bold text-primary uppercase">Segunda Leitura</h2>
                      </div>
                      <div className="text-right mb-4">
                        <p className="italic text-sm text-muted-foreground">{leitura.titulo}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm">
                          <span className="text-primary">Leitura da {leitura.titulo.replace('Leitura do ', '')} </span>
                          <span className="text-primary font-semibold">{leitura.referencia}</span>
                        </p>
                      </div>
                      <div className="space-y-3">
                        {leitura.texto.split('\n').map((paragrafo, i) => {
                          const trimmed = paragrafo.trim();
                          if (!trimmed) return null;
                          
                          const match = trimmed.match(/^(\d+(?:,\d+)?(?:-\d+)?(?:[a-z])?)\s*(.*)/);
                          if (match) {
                            const [, numero, texto] = match;
                            return (
                              <div key={i} className="flex">
                                <span className="text-primary font-semibold mr-3 flex-shrink-0">{numero}</span>
                                <p className="leading-relaxed">{texto}</p>
                              </div>
                            );
                          }
                          return (
                            <p key={i} className="leading-relaxed">{trimmed}</p>
                          );
                        })}
                      </div>
                      <div className="mt-6">
                        <p className="font-semibold">— Palavra do Senhor.</p>
                        <p>— Graças a Deus.</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="italic">Hoje não há segunda leitura.</p>
              )}
            </TabsContent>

            <TabsContent value="evangelho">
              {liturgiaData?.leituras.evangelho && liturgiaData.leituras.evangelho.length > 1 && (
                <div className="bg-muted/50 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Há {liturgiaData.leituras.evangelho.length} opções de evangelho disponíveis. O celebrante deve escolher um deles.
                  </p>
                </div>
              )}
              {liturgiaData?.leituras.evangelho?.map((evangelho, index) => {
                const isPaixao = evangelho.titulo.startsWith("Paixão de nosso Senhor Jesus Cristo");

                return (
                  <div key={index} className={`${index > 0 ? 'pt-6 border-t-2 border-dashed border-muted' : ''}`}>
                    {liturgiaData.leituras.evangelho && liturgiaData.leituras.evangelho.length > 1 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                          Opção {index + 1}
                        </span>
                      </div>
                    )}
                    <h2 className="text-lg font-semibold mb-2">Evangelho {evangelho.referencia}</h2>
                    <div className={`${fontSize}`}>
                      <p className="italic mb-2">
                        {evangelho.titulo.split(/(✠)/g).map((parte, idx) =>
                          parte === '✠' ? (
                            <span key={idx} className="text-red-800 font-bold">{parte}</span>
                          ) : (
                            <span key={idx}>{parte}</span>
                          )
                        )}
                      </p>
                      {!isPaixao && <p>— Glória a vós, Senhor.</p>}

                      {evangelho.texto.split('\n').map((i) => (
                        <p key={i} className="leading-relaxed whitespace-pre-line">
                          {evangelho.texto}
                        </p>
                      ))}

                      <p className="mt-4 font-semibold">— Palavra da Salvação.</p>
                      <p>— Glória a vós, Senhor.</p>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        )
      )}

    </main >
  )
}

export default Liturgia
