/**
 * Transaction Creation / Edit - Modal-based data entry form.
 * Handles validation and persistence of financial records via global context.
 */
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { X } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  editTx?: any;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, editTx }) => {
  const { addTransaction, editTransaction } = useFinance();
  
  const [formData, setFormData] = useState({
    id: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense',
    description: ''
  });

  useEffect(() => {
    if (editTx) {
      setFormData({
        ...editTx,
        amount: editTx.amount.toString(),
      });
    }
  }, [editTx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: formData.id || Date.now().toString()
    };
    
    if (editTx) {
      editTransaction(payload as any);
    } else {
      addTransaction(payload as any);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel animate-fade-in" style={{
        padding: '2rem',
        width: '100%',
        maxWidth: '450px',
        background: 'var(--bg-color)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}
          className="hoverable"
        >
          <X size={24} />
        </button>
        
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          {editTx ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Description</label>
            <input 
              required
              style={{ width: '100%' }}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. Groceries"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Amount</label>
              <input 
                required
                type="number"
                step="0.01"
                min="0"
                style={{ width: '100%' }}
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Date</label>
              <input 
                required
                type="date"
                style={{ width: '100%' }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Type</label>
              <select 
                style={{ width: '100%' }}
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Category</label>
              <select 
                style={{ width: '100%' }}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="" disabled>Select</option>
                <option value="Salary">Salary</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Rent">Rent</option>
                <option value="Shopping">Shopping</option>
                <option value="Dining">Dining</option>
                <option value="Utilities">Utilities</option>
                <option value="Freelance">Freelance</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary-accent)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              marginTop: '1rem',
            }}
            className="hoverable"
          >
            {editTx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};
