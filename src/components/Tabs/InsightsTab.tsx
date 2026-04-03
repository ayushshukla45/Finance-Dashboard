/**
 * Analytics View - Performs deep analysis of financial transaction history.
 * Computes savings rates, high-expense categories, and monthly predictions.
 */
import React, { useMemo } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { ShieldAlert, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

export const InsightsTab: React.FC = () => {
  const { transactions } = useFinance();

  const { highestCategory, highestAmount, savingsRate, monthlyForecast } = useMemo(() => {
    // 1. Highest Spend Category
    const categories: Record<string, number> = {};
    let highestCat = 'None';
    let highestAmt = 0;

    // 2. Savings Rate (Total Income vs Total Expenses)
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
        categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
      }
    });

    for (const [cat, amt] of Object.entries(categories)) {
      if (amt > highestAmt) {
        highestAmt = amt;
        highestCat = cat;
      }
    }

    const savingsPercentage = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    // 3. Monthly Forecast (Simple prediction: avg expense * 1.1 buffer)
    const activeMonths = new Set(transactions.map(tx => tx.date.substring(0, 7))).size || 1;
    const avgMonthlyExpense = totalExpense / activeMonths;
    const forecast = avgMonthlyExpense * 1.1; // 10% buffer

    return {
      highestCategory: highestCat,
      highestAmount: highestAmt,
      savingsRate: savingsPercentage,
      monthlyForecast: forecast
    };
  }, [transactions]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <ShieldAlert size={28} className="text-primary" />
          <h2>Deep Financial Analysis</h2>
        </div>
        <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>
          Your algorithmic budget analyzer has compiled key metrics across all ledgers.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          
          {/* Card 1: Highest Spend */}
          <div className="glass-panel hoverable" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
               <AlertTriangle size={20} className="text-warning" />
               <h3 style={{ fontSize: '1.1rem' }}>Highest Category</h3>
            </div>
            <p className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{highestCategory}</p>
            <p className="text-muted mono-number" style={{ marginTop: '0.5rem' }}>${highestAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>

          {/* Card 2: Savings Rate */}
          <div className="glass-panel hoverable" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
               <TrendingUp size={20} className="text-success" />
               <h3 style={{ fontSize: '1.1rem' }}>Savings Rate</h3>
            </div>
            <p className={savingsRate > 0 ? "text-success" : "text-danger"} style={{ fontSize: '1.5rem', fontWeight: 600 }}>
               {savingsRate.toFixed(1)}%
            </p>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Income vs Total Expenses</p>
          </div>

          {/* Card 3: Monthly Forecast */}
          <div className="glass-panel hoverable" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
               <Lightbulb size={20} className="text-primary" />
               <h3 style={{ fontSize: '1.1rem' }}>Monthly Forecast</h3>
            </div>
            <p className="mono-number" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
               ~${monthlyForecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Predicted average trajectory (+10% buffer)</p>
          </div>

        </div>
      </div>
    </div>
  );
};
