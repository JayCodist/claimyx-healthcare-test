# Healthcare Billing Dashboard

A comprehensive healthcare billing dashboard with revenue forecasting capabilities using Monte Carlo simulation.

## Features

- **Dashboard Summary**
  - Total billing amount and count of claims by status
  - Visual representation of claim distribution
  - Real-time updates

- **Claims Management**
  - Filterable and sortable claims table
  - Full-text search across all fields
  - Status-based filtering
  - Column sorting

- **Revenue Forecasting**
  - Monte Carlo simulation for revenue prediction
  - Adjustable payment probabilities
  - Real-time simulation updates
  - Statistical analysis with confidence intervals
  - Distribution visualization

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui component library
- Recharts for data visualization

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            
│   ├── claims/            # Claims table components
│   ├── dashboard/         # Dashboard summary components
│   ├── simulation/        # Monte Carlo simulation components
│   └── ui/                # shadcn/ui components
├── lib/                   
│   ├── monteCarlo.ts      # Simulation logic
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Utility functions
└── tests/                 # Test files
```

## Component Architecture

### Claims Table
- Uses server-side data fetching
- Implements client-side filtering and sorting
- Responsive design with mobile optimization

### Monte Carlo Simulation
- Client-side calculations with 2000 iterations
- Uses Web Workers for performance
- Real-time updates without UI blocking

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

### Integration Tests
- Component integration testing
- Data flow validation
- Error handling verification

## Performance Considerations

1. **Server Components**
   - Used for static content
   - Reduces client-side JavaScript

2. **Monte Carlo Simulation**
   - Optimized calculation engine
   - Background processing
   - Throttled updates

3. **Data Management**
   - Efficient filtering algorithms
   - Memoized calculations
   - Lazy loading where applicable

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

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components
   - Implement proper error handling
   - Add JSDoc comments for complex functions

2. **Testing**
   - Write tests for new features
   - Maintain 70% code coverage
   - Test edge cases
   - Mock external dependencies

3. **Performance**
   - Monitor bundle size
   - Optimize expensive calculations
   - Use proper React hooks
   - Implement proper memoization
