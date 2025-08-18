import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { MailCheck, Heart, Loader2 } from "lucide-react"

export default function CreditsPage() {
    const [form, setForm] = useState({ name: "", suggestion: "" })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setSending(true)
        try {
            const response = await fetch("https://formspree.io/f/xnnvekea", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    message: form.suggestion,
                    email: "pedromelo.dev.contato@gmail.com"
                }),
            })
            if (response.ok) {
                setSent(true)
            } else {
                throw new Error("Erro ao enviar")
            }
        } catch (error) {
            console.error("Erro ao enviar:", error)
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Créditos</h1>
                <p className="text-muted-foreground">Agradecemos a cada alma que contribuiu com este projeto católico com amor e fé.</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Colaboradores</h2>
                        <ul className="space-y-1 text-muted-foreground">
                            <li><Heart className="inline w-4 h-4 mr-1 text-pink-500" /> Pedro Henrique Melo – Desenvolvimento</li>
                            <li><Heart className="inline w-4 h-4 mr-1 text-pink-500" /> Danyel – API de liturgia</li>
                            <li><Heart className="inline w-4 h-4 mr-1 text-pink-500" /> Diácono Maxsuwel – Revisão Pastoral</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-center">Envie sua sugestão</h2>
                    {sent ? (
                        <p className="text-green-600 text-center flex items-center justify-center gap-2">
                            <MailCheck className="w-5 h-5" /> Obrigado! Sua sugestão foi enviada.
                        </p>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Seu nome</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Digite seu nome"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="suggestion">Sua sugestão</Label>
                                <Textarea
                                    id="suggestion"
                                    name="suggestion"
                                    value={form.suggestion}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex: Seria legal ter um devocionário..."
                                    className="min-h-[120px]"
                                />
                            </div>
                            <Button type="submit" disabled={sending} className="w-full">
                                {sending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Enviando...
                                    </div>
                                ) : "Enviar sugestão"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
