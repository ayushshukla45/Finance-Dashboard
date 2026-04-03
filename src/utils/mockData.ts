import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2023-10-02', amount: 150, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: '3', date: '2023-10-05', amount: 60, category: 'Transport', type: 'expense', description: 'Uber' },
  { id: '4', date: '2023-10-08', amount: 120, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify' },
  { id: '5', date: '2023-10-10', amount: 800, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: '6', date: '2023-10-15', amount: 200, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: '7', date: '2023-10-18', amount: 90, category: 'Dining', type: 'expense', description: 'Dinner with friends' },
  { id: '8', date: '2023-10-21', amount: 45, category: 'Transport', type: 'expense', description: 'Gas Station' },
  { id: '9', date: '2023-10-25', amount: 300, category: 'Shopping', type: 'expense', description: 'New Clothes' },
  { id: '10', date: '2023-10-28', amount: 100, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '11', date: '2023-11-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '12', date: '2023-11-03', amount: 180, category: 'Groceries', type: 'expense', description: "Trader Joe's" },
  { id: '13', date: '2023-11-06', amount: 55, category: 'Transport', type: 'expense', description: 'Uber' },
  { id: '14', date: '2023-11-09', amount: 250, category: 'Shopping', type: 'expense', description: 'Amazon Purchases' },
  { id: '15', date: '2023-11-12', amount: 800, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
];

export const initialTheme = 'dark';
export const initialRole = 'viewer';
