import React, { useState } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { User, Shield, Terminal, Mail, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import type { Role } from '../../types';

export const SettingsTab: React.FC = () => {
  const { role, setRole, shuffleData } = useFinance();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleForceSync = () => {
    setIsSyncing(true);
    setSyncMessage(null);
    
    // Simulate network delay for 1.5 seconds
    setTimeout(() => {
      shuffleData();
      setIsSyncing(false);
      setSyncMessage('Sync Successful');
      
      // Clear the success toast after 3 seconds
      setTimeout(() => setSyncMessage(null), 3000);
    }, 1500);
  };

  return (
    <div className="animate-fade-in glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <Terminal size={28} className="text-success" />
        <h2>System Configuration & Profile</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* User Profile Section (Personalized) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ 
            width: '100px', height: '100px', 
            borderRadius: '50%', background: 'var(--bg-panel)', 
            border: '2px solid var(--primary-accent)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative'
          }}>
             <User size={40} className="text-secondary" />
             <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary-accent)', borderRadius: '50%', padding: '0.35rem', cursor: 'pointer' }} className="hoverable flex-center">
               <Camera size={14} color="#000" />
             </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Ayush Shukla</h3>
            <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Mail size={16} /> urayushshukla@gmail.com
            </p>
          </div>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)' }} />

        {/* Configurations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Shield size={18} /> Access Clearance Level (RBAC Role)
            </label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as Role)}
              style={{ maxWidth: '400px', cursor: 'pointer' }}
            >
              <option value="viewer" style={{ color: 'black' }}>Viewer (Read-Only)</option>
              <option value="admin" style={{ color: 'black' }}>Admin (Full Override)</option>
            </select>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
               Switching to Admin un-hides the "+ INJECT DATA" button globally and grants Write privileges.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <User size={18} /> Call Sign
            </label>
            <input type="text" readOnly value="Cipher_Operative_09" style={{ maxWidth: '400px', cursor: 'not-allowed', color: 'var(--primary-accent)' }} />
          </div>
        </div>

        {/* Sync Data Logic */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <button 
             onClick={handleForceSync}
             disabled={isSyncing}
             className={`glowing-btn hoverable ${isSyncing ? 'syncing' : ''}`} 
             style={{ 
               padding: '0.75rem 2rem', 
               borderRadius: '4px',
               display: 'flex',
               alignItems: 'center',
               gap: '0.5rem',
               opacity: isSyncing ? 0.7 : 1,
               cursor: isSyncing ? 'not-allowed' : 'pointer',
               transition: 'all 0.2sease'
             }}
           >
             {isSyncing ? (
               <>
                 <Loader2 size={18} className="spin-anim" /> SYNCING...
               </>
             ) : (
               'FORCE SYNC DATA'
             )}
           </button>
           
           {syncMessage && (
             <div className="text-success animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
               <CheckCircle2 size={18} /> {syncMessage}
             </div>
           )}
        </div>

      </div>
    </div>
  );
};
