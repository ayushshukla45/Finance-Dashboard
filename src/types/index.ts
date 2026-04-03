export type Role = 'viewer' | 'admin';
export type Theme = 'dark' | 'light';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  activeTab: string;
}

export type FinanceAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_THEME' }
  | { type: 'LOAD_DATA'; payload: FinanceState }
  | { type: 'SHUFFLE_DATA' }
  | { type: 'SET_ACTIVE_TAB'; payload: string };
