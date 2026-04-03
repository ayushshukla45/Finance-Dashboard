import React, { useMemo } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { isSameMonth, parseISO } from 'date-fns';

export const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const list = [];
    
    // Calculate highest spending category
    const categories: Record<string, number> = {};
    const currentMonthExpenses = transactions.filter(tx => tx.type === 'expense' && isSameMonth(new Date(), parseISO(tx.date)));
    
    currentMonthExpenses.forEach(tx => {
      categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
    });

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    
    if (sortedCategories.length > 0) {
      list.push({
        type: 'warning',
        icon: <AlertTriangle size={20} className="text-warning" />,
        message: `Your highest spending category this month is ${sortedCategories[0][0]} ($${sortedCategories[0][1].toLocaleString()}).`
      });
    }

    // Savings generic check
    const currentMonthIncome = transactions.filter(tx => tx.type === 'income' && isSameMonth(new Date(), parseISO(tx.date)))
                                         .reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpenses = currentMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0);

    if (currentMonthIncome > totalExpenses) {
      list.push({
        type: 'success',
        icon: <CheckCircle size={20} className="text-success" />,
        message: `Great job! You have saved $${(currentMonthIncome - totalExpenses).toLocaleString()} this month.`
      });
    } else {
      list.push({
        type: 'info',
        icon: <Lightbulb size={20} className="text-primary" />,
        message: `Consider reviewing recurring expenses to increase your savings rate.`
      });
    }

    return list;
  }, [transactions]);

  return (
    <div className="glass-panel animate-fade-in hoverable" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Lightbulb size={24} className="text-primary" /> Key Data Insights
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {insights.map((insight, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            background: `var(--bg-color)`,
            border: '1px solid var(--border-color)',
            animationDelay: `${index * 0.15}s`
          }} className="animate-fade-in">
            <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--bg-panel)' }}>
              {insight.icon}
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{insight.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
