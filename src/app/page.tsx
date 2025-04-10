import { ClaimsTable } from "@/components/claims/ClaimsTable"
import { DashboardSummary } from "@/components/dashboard/DashboardSummary"
import { MonteCarloSimulation } from "@/components/simulation/MonteCarloSimulation"

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Healthcare Billing Dashboard</h1>
      <div className="space-y-8">
        <section>
          <DashboardSummary />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Revenue Forecasting</h2>
          <MonteCarloSimulation />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Claims Overview</h2>
          <ClaimsTable />
        </section>
      </div>
    </main>
  )
}
