import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react"

export default function AlertsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Centro de Alertas</h1>
                <p className="text-muted-foreground text-zinc-400">Notificaciones inteligentes y riesgos detectados.</p>
            </div>

            <div className="space-y-4">
                {/* Placeholder Alerts */}
                <Card className="bg-zinc-900 border-l-4 border-l-yellow-600 border-y-zinc-800 border-r-zinc-800 text-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg">Desviación de Presupuesto Detectada</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-400 mb-2">La partida de "Cimentación" en <strong>Residencial Meraki I</strong> ha superado el coste estimado en un 12%.</p>
                        <p className="text-xs text-zinc-500">Detectado hace 2 horas • Fuente: SQL Obras</p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-l-4 border-l-blue-600 border-y-zinc-800 border-r-zinc-800 text-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Nuevo Hito de Cobro Disponible</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-400 mb-2">Se ha completado la fase "Estructura" en Asana. Ya puedes emitir la factura nº 2104.</p>
                        <p className="text-xs text-zinc-500">Detectado hace 5 horas • Fuente: Asana</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
