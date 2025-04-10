import { ClaimsTable } from "@/components/claims/ClaimsTable"
import { DashboardSummaryServer } from "@/components/dashboard/DashboardSummaryServer"
import { MonteCarloSimulation } from "@/components/simulation/MonteCarloSimulation"

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Healthcare Claims Dashboard</h1>
      <div className="space-y-6 sm:space-y-8">
        <section>
          <DashboardSummaryServer />
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Claims Overview</h2>
          <ClaimsTable />
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Monte Carlo Simulation</h2>
          <MonteCarloSimulation />
        </section>
      </div>
    </main>
  )
}
