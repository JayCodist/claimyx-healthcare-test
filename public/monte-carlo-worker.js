self.addEventListener('message', (event) => {
  const { claims, probabilities } = event.data;
  
  const results = [];
  const NUM_SIMULATIONS = 2000;
  
  // Run simulations
  for (let i = 0; i < NUM_SIMULATIONS; i++) {
    let total = 0;
    for (const claim of claims) {
      const probability = probabilities[claim.payment_status.toLowerCase()];
      const willPay = Math.random() * 100 <= probability;
      total += willPay ? claim.amount : 0;
    }
    results.push(total);
  }
  
  // Calculate statistics
  const expectedRevenue = results.reduce((a, b) => a + b, 0) / NUM_SIMULATIONS;
  const minRevenue = Math.min(...results);
  const maxRevenue = Math.max(...results);
  
  // Calculate confidence interval
  const sortedResults = [...results].sort((a, b) => a - b);
  const lowerIndex = Math.floor(0.025 * results.length);
  const upperIndex = Math.floor(0.975 * results.length);
  const confidenceInterval = {
    lower: sortedResults[lowerIndex],
    upper: sortedResults[upperIndex],
  };
  
  // Calculate distribution
  const min = Math.min(...results);
  const max = Math.max(...results);
  const bins = 10;
  const binSize = (max - min) / bins;
  const distribution = Array(bins).fill(0).map((_, i) => ({
    range: `${formatCurrency(min + i * binSize)} - ${formatCurrency(min + (i + 1) * binSize)}`,
    count: 0
  }));
  
  results.forEach(result => {
    const binIndex = Math.min(Math.floor((result - min) / binSize), bins - 1);
    distribution[binIndex].count++;
  });
  
  self.postMessage({
    expectedRevenue,
    minRevenue,
    maxRevenue,
    confidenceInterval,
    distribution
  });
});

function formatCurrency(value) {
  return `$${(value / 1000).toFixed(1)}k`;
} 