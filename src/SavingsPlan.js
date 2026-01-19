import React, { useState } from 'react';
import './SavingsPlan.css';

function SavingsPlan() {
  const [estimatedUsage, setEstimatedUsage] = useState('');
  const [hourlyCommitment, setHourlyCommitment] = useState('');
  const [planPurchased, setPlanPurchased] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);
  const [error, setError] = useState('');

  const calculatePlan = () => {
    const usage = parseFloat(estimatedUsage);
    const commitment = parseFloat(hourlyCommitment);
    
    if (isNaN(usage) || isNaN(commitment) || usage <= 0 || commitment <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }
    
    setError('');

    const dailyCost = commitment * 24;
    const monthlyCost = dailyCost * 30.44; // Average days per month (365.25/12)
    const yearlyCost = monthlyCost * 12;
    const savings = usage > commitment ? ((usage - commitment) / usage * 100).toFixed(2) : 0;

    return {
      usage,
      commitment,
      dailyCost: dailyCost.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      yearlyCost: yearlyCost.toFixed(2),
      savings
    };
  };

  const handleBuyPlan = () => {
    const plan = calculatePlan();
    if (plan) {
      setPlanDetails(plan);
      setPlanPurchased(true);
    }
  };

  const handleReset = () => {
    setEstimatedUsage('');
    setHourlyCommitment('');
    setPlanPurchased(false);
    setPlanDetails(null);
    setError('');
  };

  return (
    <div className="savings-plan-container">
      <h1>Compute Savings Plan</h1>
      
      {!planPurchased ? (
        <div className="plan-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="estimatedUsage">
              Estimated Usage ($/hour):
            </label>
            <input
              type="number"
              id="estimatedUsage"
              value={estimatedUsage}
              onChange={(e) => setEstimatedUsage(e.target.value)}
              placeholder="Enter estimated usage per hour"
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hourlyCommitment">
              Hourly Commitment ($/hour):
            </label>
            <input
              type="number"
              id="hourlyCommitment"
              value={hourlyCommitment}
              onChange={(e) => setHourlyCommitment(e.target.value)}
              placeholder="Enter hourly commitment"
              step="0.01"
              min="0"
            />
          </div>

          <button 
            className="buy-button"
            onClick={handleBuyPlan}
            disabled={!estimatedUsage || !hourlyCommitment}
          >
            Buy Savings Plan
          </button>
        </div>
      ) : (
        <div className="plan-confirmation">
          <h2>✓ Savings Plan Purchased Successfully!</h2>
          
          <div className="plan-details">
            <h3>Plan Details:</h3>
            <div className="detail-row">
              <span className="detail-label">Estimated Usage:</span>
              <span className="detail-value">${planDetails.usage}/hour</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Hourly Commitment:</span>
              <span className="detail-value">${planDetails.commitment}/hour</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Daily Cost:</span>
              <span className="detail-value">${planDetails.dailyCost}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Monthly Cost:</span>
              <span className="detail-value">${planDetails.monthlyCost}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Yearly Cost:</span>
              <span className="detail-value">${planDetails.yearlyCost}</span>
            </div>
            {planDetails.savings > 0 && (
              <div className="detail-row savings-row">
                <span className="detail-label">Potential Savings:</span>
                <span className="detail-value">{planDetails.savings}%</span>
              </div>
            )}
          </div>

          <button className="reset-button" onClick={handleReset}>
            Create New Plan
          </button>
        </div>
      )}

      <div className="info-section">
        <h3>How it works:</h3>
        <ul>
          <li>Enter your estimated compute usage per hour</li>
          <li>Specify how much you can commit to per hour</li>
          <li>Get a detailed breakdown of your costs</li>
          <li>Save money by committing to consistent usage</li>
        </ul>
      </div>
    </div>
  );
}

export default SavingsPlan;
