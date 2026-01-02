import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, Wallet, AlertTriangle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function FinancePage() {
    const supabase = await createClient()

    // Fetch transactions
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })

    if (error) {
        return (
            <div className="p-4 text-red-500 border border-red-500 rounded bg-red-950/20">
                <h2 className="font-bold flex gap-2 items-center"><AlertTriangle /> Error cargando finanzas</h2>
                <p>{error.message}</p>
            </div>
        )
    }

    // Calculate Financials
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    let totalBalance = 0
    let monthlyIncome = 0
    let monthlyExpenses = 0

    if (transactions) {
        transactions.forEach((tx: any) => {
            const amount = Number(tx.amount) || 0
            totalBalance += amount

            const txDate = new Date(tx.date)
            if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
                if (amount > 0) {
                    monthlyIncome += amount
                } else {
                    monthlyExpenses += amount // this will be negative
                }
            }
        })
    }

    const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Finanzas</h1>
                <p className="text-muted-foreground text-zinc-400">Control de flujo de caja y movimientos bancarios.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                        <Wallet className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatter.format(totalBalance)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Entradas (Mes Actual)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{formatter.format(monthlyIncome)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Salidas (Mes Actual)</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{formatter.format(Math.abs(monthlyExpenses))}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>Flujo de Caja</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] flex items-center justify-center border border-dashed border-zinc-800 rounded-lg text-zinc-500">
                            Gráfico de Ingresos vs Gastos (Próximamente)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>Últimos Movimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions && transactions.length > 0 ? (
                                transactions.slice(0, 5).map((tx: any) => (
                                    <div key={tx.id} className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm truncate max-w-[200px]" title={tx.description}>{tx.description}</span>
                                            <span className="text-xs text-zinc-500">{new Date(tx.date).toLocaleDateString()} · {tx.category || 'General'}</span>
                                        </div>
                                        <div className={`font-mono font-medium ${tx.amount > 0 ? 'text-green-500' : 'text-zinc-300'}`}>
                                            {tx.amount > 0 ? '+' : ''}{formatter.format(tx.amount)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-center text-zinc-500 py-8">No hay transacciones recientes.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
