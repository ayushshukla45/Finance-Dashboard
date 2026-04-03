import React, { useMemo } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

/**
 * Budget Summary View - Displays critical KPIs (Balance, Income, Expenses).
 * Features real-time calculation and responsive grid/flex layouts.
 */
export const SummaryCards: React.FC = () => {
  const { transactions } = useFinance();

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === 'income') {
          acc.income += tx.amount;
        } else {
          acc.expense += tx.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: <DollarSign size={24} className="text-primary" />,
      color: 'var(--primary-accent)',
      trend: '+2.5%'
    },
    {
      title: 'Total Income',
      amount: income,
      icon: <TrendingUp size={24} className="text-success" />,
      color: 'var(--success)',
      trend: '+12.5%'
    },
    {
      title: 'Total Expenses',
      amount: expense,
      icon: <TrendingDown size={24} className="text-danger" />,
      color: 'var(--danger)',
      trend: '-4.1%'
    }
  ];

  return (
    <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      {cards.map((card, idx) => (
        <div key={idx} className="glass-panel animate-fade-in hoverable" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', animationDelay: `${idx * 0.1}s` }}>
          <div className="flex-between">
            <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{card.title}</h3>
            <div style={{ background: `${card.color}22`, padding: '0.5rem', borderRadius: '50%' }}>
              {card.icon}
            </div>
          </div>
          <div className="flex-between" style={{ alignItems: 'flex-end' }}>
            <h2 style={{ fontSize: '2rem', letterSpacing: '-1px' }}>
              ${card.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <span style={{ color: card.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>
              {card.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
