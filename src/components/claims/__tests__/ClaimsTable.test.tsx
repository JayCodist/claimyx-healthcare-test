import { render, screen, fireEvent } from '@testing-library/react';
import { ClaimsTable } from '../ClaimsTable';
import { mockBillingRecords } from '@/lib/mockData';

describe('ClaimsTable', () => {
  it('renders all claims from mock data', () => {
    render(<ClaimsTable />);
    
    // Check if all patient names are rendered
    mockBillingRecords.forEach(record => {
      expect(screen.getByText(record.patient_name)).toBeInTheDocument();
    });
  });

  it('filters claims by search term', () => {
    render(<ClaimsTable />);
    
    const searchInput = screen.getByPlaceholderText('Search claims...');
    fireEvent.change(searchInput, { target: { value: 'John Smith' } });

    // Should only show John Smith's record
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument();
  });

  it('filters claims by status', () => {
    render(<ClaimsTable />);
    
    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'Pending' } });

    // Should only show pending claims
    const pendingBadges = screen.getAllByText('Pending');
    expect(pendingBadges.length).toBe(2); // We have 2 pending claims in mock data
  });

  it('sorts claims by amount', () => {
    render(<ClaimsTable />);
    
    // Find and click the Amount header
    const amountHeader = screen.getByText('Amount');
    fireEvent.click(amountHeader);

    // Get all amount cells
    const amounts = screen.getAllByText(/\$[\d,]+\.\d{2}/);
    const values = amounts.map(el => parseFloat(el.textContent!.replace('$', '').replace(',', '')));

    // Check if sorted in ascending order
    const isSorted = values.every((val, i) => i === 0 || val >= values[i - 1]);
    expect(isSorted).toBe(true);
  });

  it('displays correct status badge colors', () => {
    render(<ClaimsTable />);
    
    const pendingBadges = screen.getAllByText('Pending');
    const approvedBadges = screen.getAllByText('Approved');
    const deniedBadges = screen.getAllByText('Denied');

    pendingBadges.forEach(badge => {
      expect(badge.className).toContain('bg-yellow-100');
    });

    approvedBadges.forEach(badge => {
      expect(badge.className).toContain('bg-green-100');
    });

    deniedBadges.forEach(badge => {
      expect(badge.className).toContain('bg-red-100');
    });
  });
}); 