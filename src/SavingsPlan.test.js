import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SavingsPlan from './SavingsPlan';

describe('SavingsPlan Component', () => {
  test('renders the component with title', () => {
    render(<SavingsPlan />);
    expect(screen.getByText('Compute Savings Plan')).toBeInTheDocument();
  });

  test('renders input fields', () => {
    render(<SavingsPlan />);
    expect(screen.getByLabelText(/Estimated Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hourly Commitment/i)).toBeInTheDocument();
  });

  test('buy button is disabled when fields are empty', () => {
    render(<SavingsPlan />);
    const buyButton = screen.getByText('Buy Savings Plan');
    expect(buyButton).toBeDisabled();
  });

  test('buy button is enabled when both fields have values', () => {
    render(<SavingsPlan />);
    const usageInput = screen.getByLabelText(/Estimated Usage/i);
    const commitmentInput = screen.getByLabelText(/Hourly Commitment/i);
    
    fireEvent.change(usageInput, { target: { value: '10' } });
    fireEvent.change(commitmentInput, { target: { value: '5' } });
    
    const buyButton = screen.getByText('Buy Savings Plan');
    expect(buyButton).not.toBeDisabled();
  });

  test('displays plan details after purchase', () => {
    render(<SavingsPlan />);
    const usageInput = screen.getByLabelText(/Estimated Usage/i);
    const commitmentInput = screen.getByLabelText(/Hourly Commitment/i);
    const buyButton = screen.getByText('Buy Savings Plan');
    
    fireEvent.change(usageInput, { target: { value: '10' } });
    fireEvent.change(commitmentInput, { target: { value: '5' } });
    fireEvent.click(buyButton);
    
    expect(screen.getByText(/Savings Plan Purchased Successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Details:/i)).toBeInTheDocument();
  });

  test('calculates daily cost correctly', () => {
    render(<SavingsPlan />);
    const usageInput = screen.getByLabelText(/Estimated Usage/i);
    const commitmentInput = screen.getByLabelText(/Hourly Commitment/i);
    const buyButton = screen.getByText('Buy Savings Plan');
    
    fireEvent.change(usageInput, { target: { value: '10' } });
    fireEvent.change(commitmentInput, { target: { value: '5' } });
    fireEvent.click(buyButton);
    
    // Daily cost should be 5 * 24 = 120
    expect(screen.getByText(/\$120\.00/)).toBeInTheDocument();
  });

  test('reset button creates new plan', () => {
    render(<SavingsPlan />);
    const usageInput = screen.getByLabelText(/Estimated Usage/i);
    const commitmentInput = screen.getByLabelText(/Hourly Commitment/i);
    const buyButton = screen.getByText('Buy Savings Plan');
    
    fireEvent.change(usageInput, { target: { value: '10' } });
    fireEvent.change(commitmentInput, { target: { value: '5' } });
    fireEvent.click(buyButton);
    
    const resetButton = screen.getByText('Create New Plan');
    fireEvent.click(resetButton);
    
    expect(screen.getByText('Buy Savings Plan')).toBeInTheDocument();
    expect(screen.queryByText(/Savings Plan Purchased Successfully/i)).not.toBeInTheDocument();
  });

  test('displays how it works information', () => {
    render(<SavingsPlan />);
    expect(screen.getByText('How it works:')).toBeInTheDocument();
    expect(screen.getByText(/Enter your estimated compute usage per hour/i)).toBeInTheDocument();
  });
});
