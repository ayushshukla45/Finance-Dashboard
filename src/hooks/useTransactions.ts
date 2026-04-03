import { useState, useMemo } from 'react';
import type { Transaction } from '../types';
import { useFinance } from './useFinance';

export const useTransactions = () => {
  const { transactions } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    return transactions.filter((tx: Transaction) => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, filterType]);

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filteredTransactions,
  };
};
