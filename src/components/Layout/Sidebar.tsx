import React from 'react';
import { LayoutDashboard, Wallet, PieChart, Info, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`glass-panel app-sidebar ${isOpen ? 'open' : ''}`} style={{ margin: '2rem 0 2rem 2rem', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)', position: 'sticky', top: '2rem', border: '1px solid rgba(0,229,255,0.1)', boxShadow: '4px 0 24px rgba(0,0,0,0.8)' }}>
        <div className="flex-center sidebar-header" style={{ marginBottom: '3rem', gap: '0.75rem' }}>
          <div className="flex-center" style={{ background: 'var(--primary-accent)', borderRadius: '12px', width: '40px', height: '40px', boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)' }}>
            <Wallet size={24} color="#000" />
          </div>
          <h1 style={{ fontSize: '1.5rem', letterSpacing: '-1px', textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>FinDash</h1>
        </div>

        <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          <NavItem 
            icon={<LayoutDashboard size={22} />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => { setActiveTab('overview'); onClose?.(); }}
          />
          <NavItem 
            icon={<PieChart size={22} />} 
            label="Transactions" 
            active={activeTab === 'transactions'} 
            onClick={() => { setActiveTab('transactions'); onClose?.(); }}
          />
          <NavItem 
            icon={<Info size={22} />} 
            label="Insights" 
            active={activeTab === 'insights'}
            onClick={() => { setActiveTab('insights'); onClose?.(); }}
          />
          
          <div style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
            <NavItem 
              icon={<Settings size={22} />} 
              label="Settings" 
              active={activeTab === 'settings'}
              onClick={() => { setActiveTab('settings'); onClose?.(); }}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={`hoverable nav-item-btn ${active ? 'active-nav' : ''}`}
      style={{ 
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: '0.75rem', 
        padding: '0.75rem 1rem', 
        borderRadius: '12px',
        color: active ? '#000' : 'var(--text-secondary)',
        background: active ? 'var(--primary-accent)' : 'transparent',
        fontSize: '1rem',
        fontWeight: active ? 600 : 500,
        boxShadow: active ? '0 8px 16px rgba(0, 229, 255, 0.25)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid transparent',
        textAlign: 'left'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '32px', 
        height: '32px',
        flexShrink: 0 
      }}>
        {icon}
      </div>
      <span className="nav-item-label" style={{ opacity: active ? 1 : 0.85 }}>{label}</span>
    </button>
  );
};
