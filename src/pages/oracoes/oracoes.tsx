import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Prayer } from "@/interfaces/praysTypes";
import { useState } from "react";
import { PrayersContent } from "./prayes";

export default function Oracoes() {
    const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 md:px-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6 tracking-wide font-serif text-primary">Orações Católicas</h1>

                <div className="grid grid-cols-1 gap-4">
                    {PrayersContent.map((prayer) => (
                        <Card
                            key={prayer.id}
                            onClick={() => setSelectedPrayer(prayer)}
                            className="hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <CardContent className="p-4 flex items-center gap-2">
                                <h2 className="text-lg font-medium text-primary">{prayer.title}</h2>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Dialog open={!!selectedPrayer} onOpenChange={() => setSelectedPrayer(null)}>
                    <DialogContent
                        className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-primary font-serif">{selectedPrayer?.title}</DialogTitle>
                        </DialogHeader>

                        {selectedPrayer && (
                            <Tabs defaultValue="pt" className="mt-4">
                                <TabsList className="flex gap-2">
                                    <TabsTrigger value="pt">Português</TabsTrigger>
                                    {selectedPrayer.latin && <TabsTrigger value="la">Latim</TabsTrigger>}
                                </TabsList>
                                <TabsContent value="pt">
                                    <div className="max-h-[60vh] overflow-y-auto mt-2 px-4 py-3 rounded-md shadow-inner border font-serif leading-relaxed text-justify">
                                        <p className="whitespace-pre-wrap text-primary">{selectedPrayer.content}</p>
                                    </div>
                                </TabsContent>

                                {selectedPrayer.latin && (
                                    <TabsContent value="la">
                                        <div className="max-h-[60vh] overflow-y-auto mt-2 px-4 py-3 rounded-md shadow-inner border font-serif leading-relaxed text-justify">
                                            <p className="whitespace-pre-wrap text-primary">{selectedPrayer.latin}</p>
                                        </div>
                                    </TabsContent>
                                )}
                            </Tabs>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
