"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, CreditCard, Home, Settings, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { icon: Home, label: "Vista General", href: "/dashboard" },
    { icon: Building2, label: "Obras", href: "/dashboard/projects" },
    { icon: CreditCard, label: "Finanzas", href: "/dashboard/finance" },
    { icon: AlertCircle, label: "Alertas", href: "/dashboard/alerts" },
    { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-zinc-950/95 md:block dark:bg-zinc-900">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-white">
                        <Building2 className="h-6 w-6" />
                        <span className="">Meraki Control</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {sidebarItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                                    pathname === item.href
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
