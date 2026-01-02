import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
                <p className="text-muted-foreground text-zinc-400">Resumen operativo y financiero de la empresa.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos este mes</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€0.00</div>
                        <p className="text-xs text-muted-foreground text-zinc-400">
                            +0% respecto al mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gastos Activos</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€0.00</div>
                        <p className="text-xs text-muted-foreground text-zinc-400">
                            Pendientes de pago
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Obras Activas</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground text-zinc-400">
                            En progreso
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground text-zinc-400">
                            Requieren atención
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2 bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Cronograma Financiero</CardTitle>
                            <CardDescription className="text-zinc-400">
                                Próximos hitos de cobro y pago.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-zinc-500 border border-dashed border-zinc-800 rounded-md">
                            Gráfico de Flujo de Caja (Próximamente)
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>Estado de Obras</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="text-sm text-zinc-400 text-center py-10">
                            No hay obras conectadas aún.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
