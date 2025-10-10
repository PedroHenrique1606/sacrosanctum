import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "./ui/mode-toggle";

const components = [
    {
        title: "Liturgia Diária",
        href: "/liturgia",
        description:
            "Leituras e reflexões do Evangelho para cada dia. Acompanhe a Palavra de Deus com profundidade.",
    },
    {
        title: "Orações",
        href: "/oracoes",
        description:
            "Reze com orações tradicionais, novenas, terços e devoções populares da Igreja Católica.",
    },
    {
        title: "Novenas e Devoções",
        href: "/novenas",
        description:
            "Novenas aos santos e devoções tradicionais da Igreja Católica.",
    },
    {
        title: "Calendário Litúrgico",
        href: "/calendario-liturgico",
        description:
            "Veja o tempo litúrgico atual, festas, solenidades e memórias do calendário católico.",
    },
    {
        title: "Santo Terço",
        href: "/santo-terco",
        description: "Medite e reze os mistérios do Santo Terço.",
    },
    {
        title: "Créditos",
        href: "/creditos",
        description: "Agradecimentos a todos que contribuíram para este projeto.",
    },
];

const liturgiaMissaItems = [
    {
        title: "Orações Eucarísticas",
        href: "/oracoes-eucaristicas",
        description: "Acompanhe as orações eucarísticas da Santa Missa.",
    },
    {
        title: "Rito da Comunhão",
        href: "/rito-comunhao",
        description: "Acompanhe o Rito da Comunhão da Santa Missa.",
    },
];

export function Navbar() {
    const [open, setOpen] = useState(false);

    const saibaMaisItems = [
        {
            title: "Papa Leão XIV",
            href: "/pontifex",
            description: "Conheça mais sobre o Santo Padre Leão XIV.",
        },
        {
            title: "Confissão",
            href: "/confissao",
            description: "Prepare-se para uma boa confissão.",
        },
        {
            title: "Terço da Misericórdia",
            href: "/misericordia",
            description: "Reze o Terço da Misericórdia.",
        },
    ];

    return (
        <header className="w-full border-b bg-background fixed top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="text-lg font-semibold">
                    <a href="/" className="hover:underline">Liturgia</a>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Saiba mais</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md bg-cover bg-top bg-[url(./assets/pope-leone.png)] outline-none"
                                                    href="/pontifex"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
                                                    <div className="mb-2 mt-4 px-6 text-lg font-medium text-white z-10">
                                                        Papa Leão XIV
                                                    </div>
                                                    <p className="px-6 pb-6 text-sm text-white z-10">
                                                        Conheça mais
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        {saibaMaisItems.slice(1).map((item) => (
                                            <NavListItem key={item.title} href={item.href} title={item.title}>
                                                {item.description}
                                            </NavListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Liturgia da Missa</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                                        {liturgiaMissaItems.map((item) => (
                                            <NavListItem
                                                key={item.title}
                                                title={item.title}
                                                href={item.href}
                                            >
                                                {item.description}
                                            </NavListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Reze</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components.map((component) => (
                                            <NavListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </NavListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* ModeToggle + Mobile Menu */}
                <div className="flex md:hidden items-center gap-4">
                    <ModeToggle />
                    <button onClick={() => setOpen(!open)} aria-label="Abrir menu">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <div className="hidden md:flex">
                    <ModeToggle />
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <>
                    <div 
                        className="md:hidden fixed inset-0 top-16 bg-black/50 z-30"
                        onClick={() => setOpen(false)}
                    />
                    <div className="md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 max-w-[85vw] bg-background border-l shadow-2xl z-40 overflow-y-auto">
                        <ul className="flex flex-col divide-y">
                            <li className="px-6 py-4 font-semibold text-muted-foreground uppercase text-xs">Saiba mais</li>
                            {saibaMaisItems.map((item) => (
                                <li key={item.title}>
                                    <a
                                        href={item.href}
                                        className="block px-6 py-3 text-base font-medium hover:bg-accent transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </a>
                                </li>
                            ))}

                            <li className="px-6 py-4 font-semibold text-muted-foreground uppercase text-xs">Liturgia da Missa</li>
                            {liturgiaMissaItems.map((item) => (
                                <li key={item.title}>
                                    <a
                                        href={item.href}
                                        className="block px-6 py-3 text-base font-medium hover:bg-accent transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </a>
                                </li>
                            ))}

                            <li className="px-6 py-4 font-semibold text-muted-foreground uppercase text-xs">Reze</li>
                            {components.map((item) => (
                                <li key={item.title}>
                                    <a
                                        href={item.href}
                                        className="block px-6 py-3 text-base font-medium hover:bg-accent transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </header>
    );
}

const NavListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
NavListItem.displayName = "NavListItem";
