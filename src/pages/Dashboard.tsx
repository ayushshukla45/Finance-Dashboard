import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { Sidebar } from '../components/Layout/Sidebar';
import { Header } from '../components/Layout/Header';

// Tab Pages
import { OverviewTab } from '../components/Tabs/OverviewTab';
import { InsightsTab } from '../components/Tabs/InsightsTab';
import { SettingsTab } from '../components/Tabs/SettingsTab';
import { TransactionTable } from '../components/Transactions/TransactionTable';
import { TransactionForm } from '../components/Transactions/TransactionForm';
import { SkeletonLoader } from '../components/UI/SkeletonLoader';

import { Plus } from 'lucide-react';

/**
 * Main Layout Orchestrator - Manages the high-level coordination of dashboard views.
 * Controls sidebar visibility, tab-based routing, and transaction editing flows.
 */
export const Dashboard: React.FC = () => {
  const { role, transactions, activeTab, setActiveTab } = useFinance();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.25rem', color: 'var(--primary-accent)', background: 'var(--bg-color)', fontFamily: 'JetBrains Mono' }}>
        {'>'} INITIALIZING ROOT SYSTEM...
      </div>
    );
  }

  const handleEdit = (tx: any) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const handleTabSwitch = (tab: string) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); 
  };

  const renderTabContent = () => {
    if (isTransitioning) return <SkeletonLoader />;

    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'transactions':
        return <TransactionTable onEdit={handleEdit} />;
      case 'insights':
        return <InsightsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabSwitch} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <main className="main-content">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Only Admins can add transactions, global action header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)' }}>
            Financial Summary / {activeTab}
          </h2>

          {role === 'admin' && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="hoverable flex-center glowing-btn"
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '4px',
                gap: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} /> INJECT DATA
            </button>
          )}
        </div>

        {/* Dynamic Tab Rendering Area */}
        {renderTabContent()}

        {isFormOpen && <TransactionForm onClose={() => { setIsFormOpen(false); setEditingTx(null); }} editTx={editingTx} />}
      </main>
    </div>
  );
};
