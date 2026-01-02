import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export default function ProjectsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Obras</h1>
                    <p className="text-muted-foreground text-zinc-400">Seguimiento operativo de proyectos en curso.</p>
                </div>
                <Button className="bg-white text-black hover:bg-zinc-200">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Obra
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Project Card */}
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">Residencial Meraki I</CardTitle>
                            <Badge variant="outline" className="border-green-800 text-green-500 bg-green-950/30">En Curso</Badge>
                        </div>
                        <CardDescription className="text-zinc-400">Cliente: Inversiones del Norte</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Progreso</span>
                                <span>15%</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[15%] rounded-full" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase">Presupuesto</p>
                                    <p className="font-mono">€120,000</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase">Coste Real</p>
                                    <p className="font-mono">€12,500</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Empty State if needed */}
                <Card className="bg-zinc-900 border-zinc-800 text-white border-dashed flex flex-col items-center justify-center p-6 h-[250px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <p className="text-zinc-500 mb-2">Conectar con Asana para importar obras</p>
                    <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                        Sincronizar
                    </Button>
                </Card>
            </div>
        </div>
    )
}
