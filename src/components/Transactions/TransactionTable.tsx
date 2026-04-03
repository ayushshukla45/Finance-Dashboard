import React from 'react';
import { useFinance } from '../../hooks/useFinance';
import { useTransactions } from '../../hooks/useTransactions';
import { Search, Filter, Trash2, Edit, Frown } from 'lucide-react';
import { format, parseISO } from 'date-fns';

/**
 * Transaction Ledger Component - Core data table for financial records.
 * Supports filtering, searching, and role-based action controls.
 */
export const TransactionTable: React.FC<{ onEdit: (tx: any) => void }> = ({ onEdit }) => {
  const { role, deleteTransaction } = useFinance();
  const { searchTerm, setSearchTerm, filterType, setFilterType, filteredTransactions } = useTransactions();

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Core Ledger</h3>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="flex-center" style={{ position: 'relative' }}>
            <Search size={16} className="text-muted" style={{ position: 'absolute', left: '10px' }} />
            <input 
              type="text" 
              placeholder="Search description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2rem', width: '220px' }}
            />
          </div>
          
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <Filter size={16} className="text-muted" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Ledgers</option>
              <option value="income">Incoming Vectors</option>
              <option value="expense">Outbound Vectors</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {filteredTransactions.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Amount</th>
                {role === 'admin' && <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx: any) => (
                <tr key={tx.id} className="data-row">
                  <td className="mono-number" style={{ padding: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>{format(parseISO(tx.date), 'MMM dd, yyyy')}</td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{tx.description}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="mono-number" style={{ padding: '1rem', fontWeight: 600, color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  {role === 'admin' && (
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => onEdit(tx)} style={{ marginRight: '1rem' }} className="text-primary hoverable">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteTransaction(tx.id)} className="text-danger hoverable">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
             <Frown size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
             <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No matching transactions found.</h3>
             <p>Try refining your search descriptor or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
