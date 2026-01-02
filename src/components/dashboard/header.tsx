"use client"

import { Building2, Menu, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-zinc-950/95 px-4 lg:h-[60px] lg:px-6 dark:bg-zinc-900">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden bg-transparent text-white border-zinc-800"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col bg-zinc-950 text-white border-r-zinc-800">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Building2 className="h-6 w-6" />
                            <span className="sr-only">Meraki Control</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                        >
                            Vista General
                        </Link>
                        <Link
                            href="/dashboard/finance"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            Finanzas
                        </Link>
                        <Link
                            href="/dashboard/projects"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            Obras
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            type="search"
                            placeholder="Buscar obras, facturas..."
                            className="w-full appearance-none bg-zinc-900 pl-8 text-white shadow-none md:w-2/3 lg:w-1/3 border-zinc-800 focus-visible:ring-zinc-700"
                        />
                    </div>
                </form>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xs font-bold">JD</span>
                </div>
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </header>
    )
}
