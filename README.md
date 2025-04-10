# Healthcare Claims Dashboard

A Next.js application for managing and visualizing healthcare claims data.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main page layout
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            
│   ├── claims/            # Claims management
│   │   └── ClaimsTable.tsx   # Filterable claims table
│   ├── dashboard/         # Dashboard components
│   │   ├── DashboardSummaryServer.tsx  # Server component for data processing
│   │   ├── DashboardSummaryClient.tsx  # Client component for UI rendering
│   │   └── ClaimsDistributionChart.tsx # Claims distribution visualization
│   ├── simulation/        # Monte Carlo simulation
│   │   └── MonteCarloSimulation.tsx    # Revenue forecasting
│   └── ui/               # Shared UI components (shadcn/ui)
├── lib/                   
│   ├── mockData.ts       # Mock data for development
│   ├── monteCarlo.ts     # Simulation logic
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Shared utilities
└── tests/                # Test files
```

## Component Architecture

### Features

- **Claims Management**
  - Filterable and sortable claims table
  - Full-text search across all fields
  - Status-based filtering
  - Column sorting

- **Revenue Forecasting**
  - Monte Carlo simulation for revenue prediction
  - Adjustable payment probabilities
  - Statistical analysis with confidence intervals
  - Distribution visualization

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui component library
- Recharts for data visualization

## State Management

- React's built-in useState for local component state
- Props for component communication
- No global state management needed due to component co-location

## Testing Strategy

### Unit Tests
- Jest and React Testing Library
- Component rendering tests
- User interaction tests
- Monte Carlo simulation accuracy tests

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```
