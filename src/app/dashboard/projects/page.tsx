```typescript
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertTriangle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
       <div className="p-4 text-red-500 border border-red-500 rounded bg-red-950/20">
          <h2 className="font-bold flex gap-2 items-center"><AlertTriangle /> Error cargando obras</h2>
          <p>{error.message}</p>
          <p className="text-sm mt-2 text-zinc-400">Verifica las variables de entorno en Vercel.</p>
       </div>
    )
  }

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
        {projects && projects.length > 0 ? (
          projects.map((project: any) => (
            <Card key={project.id} className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                    <Badge variant="outline" className="border-green-800 text-green-500 bg-green-950/30">
                      {project.status === 'active' ? 'En Curso' : project.status}
                    </Badge>
                </div>
                <CardDescription className="text-zinc-400">ID: {project.asana_project_gid?.slice(0, 8)}...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Progreso</span>
                        <span>{project.progress_percentage || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all" 
                          style={{ width: `${ project.progress_percentage || 0 }% ` }} 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <p className="text-xs text-zinc-500 uppercase">Presupuesto</p>
                            <p className="font-mono">€{project.budget_total || '0.00'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase">Coste Real</p>
                            <p className="font-mono">€{project.cost_accumulated || '0.00'}</p>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full bg-zinc-900 border-zinc-800 text-white border-dashed flex flex-col items-center justify-center p-12">
              <p className="text-zinc-500 mb-2">No hay obras sincronizadas aún.</p>
              <p className="text-xs text-zinc-600">Ejecuta el workflow de N8N para importar desde Asana.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
```
