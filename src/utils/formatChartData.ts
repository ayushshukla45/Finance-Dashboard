import { format, parseISO } from 'date-fns';
import type { Transaction } from '../types';

/**
 * Transforms raw transaction data into D3/Recharts compatible arrays.
 * Extracted from the component layer to ensure clean architectural boundaries.
 */
export const formatChartData = (transactions: Transaction[]) => {
  const dailyMap: Record<string, { date: string; balance: number; income: number; expense: number }> = {};
  
  // Create a time-sorted instance so balance accumulates chronologically
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentBalance = 0;
  
  sorted.forEach(tx => {
    const formattedDate = format(parseISO(tx.date), 'MMM dd');
    
    if (!dailyMap[formattedDate]) {
      dailyMap[formattedDate] = { date: formattedDate, balance: currentBalance, income: 0, expense: 0 };
    }
    
    if (tx.type === 'income') {
      dailyMap[formattedDate].income += tx.amount;
      currentBalance += tx.amount;
    } else {
      dailyMap[formattedDate].expense += tx.amount;
      currentBalance -= tx.amount;
    }
    
    dailyMap[formattedDate].balance = currentBalance;
  });

  const categoryMap: Record<string, number> = {};
  sorted.filter(tx => tx.type === 'expense').forEach(tx => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
  });

  return {
    trendData: Object.values(dailyMap),
    pieData: Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
  };
};
