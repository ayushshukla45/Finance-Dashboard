/**
 * Global Finance Context Provider.
 * Using Context API for global RBAC, transaction state, and view persistence.
 * State is synchronized with localStorage to ensure pure data persistence across user sessions.
 */
import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FinanceState, FinanceAction, Transaction, Role, Theme } from '../types';

import { mockTransactions, initialRole, initialTheme } from '../utils/mockData';

interface FinanceContextProps extends FinanceState {
  addTransaction: (tx: Transaction) => void;
  editTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  shuffleData: () => void;
  setActiveTab: (tab: string) => void;
}

export const FinanceContext = createContext<FinanceContextProps | undefined>(undefined);

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? action.payload : tx
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((tx) => tx.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SHUFFLE_DATA': {
      const shuffled = [...state.transactions].sort(() => Math.random() - 0.5);
      return { ...state, transactions: shuffled };
    }
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const getInitialState = (): FinanceState => {
  try {
    const savedState = localStorage.getItem('finance_data');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        transactions: (parsed && Array.isArray(parsed.transactions)) ? parsed.transactions : mockTransactions,
        role: (parsed && parsed.role) ? parsed.role : initialRole,
        theme: (parsed && parsed.theme) ? parsed.theme : initialTheme,
        activeTab: (parsed && parsed.activeTab) ? parsed.activeTab : 'overview'
      };
    }
  } catch (e) {
    console.error('CRITICAL ERROR: Failed to parse saved state, forcefully loading mock defaults.', e);
  }
  
  return {
    transactions: mockTransactions,
    role: initialRole as Role,
    theme: initialTheme as Theme,
    activeTab: 'overview'
  };
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, getInitialState());

  useEffect(() => {
    try {
      localStorage.setItem('finance_data', JSON.stringify({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
        activeTab: state.activeTab
      }));
    } catch(err) {
      // Failed to save state to localStorage
    }
    
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const addTransaction = (tx: Transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: tx });
  const editTransaction = (tx: Transaction) => dispatch({ type: 'EDIT_TRANSACTION', payload: tx });
  const deleteTransaction = (id: string) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  const setRole = (role: Role) => dispatch({ type: 'SET_ROLE', payload: role });
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  const shuffleData = () => dispatch({ type: 'SHUFFLE_DATA' });
  const setActiveTab = (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });

  return (
    <FinanceContext.Provider
      value={{
        ...state,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setRole,
        toggleTheme,
        shuffleData,
        setActiveTab,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
