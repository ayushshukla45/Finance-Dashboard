import React from 'react';
import { useFinance } from '../../hooks/useFinance';
import { Sun, Moon, Shield, Menu } from 'lucide-react';
import type { Role } from '../../types';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

/**
 * Application Header - Manages global actions, theme toggling, and RBAC role switching.
 * Includes responsive menu trigger for mobile viewports.
 */
export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { role, theme, setRole, toggleTheme } = useFinance();

  return (
    <header className="glass-panel flex-between" style={{ padding: '1rem 2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {onToggleSidebar && (
          <button onClick={onToggleSidebar} className="mobile-menu-btn" style={{ alignItems: 'center' }}>
            <Menu size={24} className="text-primary hoverable" />
          </button>
        )}
        <div>
          <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>Dashboard Overview</h2>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Welcome back! Here is your financial summary.</p>
        </div>
      </div>

      <div className="flex-center" style={{ gap: '1.5rem' }}>
        {/* Role Toggle Component */}
        <div className="flex-center glass-panel" style={{ padding: '0.5rem', borderRadius: '12px', display: 'none' }}>
           {/* Hiding role selector in mobile view if needed. But let's keep it visible since grid flex wraps */}
        </div>

        <div className="flex-center glass-panel" style={{ padding: '0.5rem', borderRadius: '12px' }}>
          <Shield size={16} className="text-secondary" style={{ marginRight: '0.5rem' }} />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as Role)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              outline: 'none', 
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 500,
              padding: 0
            }}
          >
            <option value="viewer" style={{ color: 'black' }}>Viewer</option>
            <option value="admin" style={{ color: 'black' }}>Admin</option>
          </select>
        </div>

        {/* Theme Toggler */}
        <button 
          onClick={toggleTheme}
          className="glass-panel hoverable flex-center"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
        </button>
      </div>
    </header>
  );
};
