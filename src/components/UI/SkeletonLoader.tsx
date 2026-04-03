import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Placeholder */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div className="skeleton-pulse" style={{ width: '150px', height: '20px', borderRadius: '4px', background: 'var(--border-color)' }}></div>
        <div className="skeleton-pulse" style={{ width: '100px', height: '32px', borderRadius: '4px', background: 'var(--border-color)' }}></div>
      </div>

      {/* Cards Row Placeholder */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-panel skeleton-pulse" style={{ height: '140px', background: 'var(--border-color)', opacity: 0.5 }}></div>
        ))}
      </div>

      {/* Table / Chart Large Area Placeholder */}
      <div className="glass-panel skeleton-pulse" style={{ height: '400px', background: 'var(--border-color)', opacity: 0.5, marginTop: '2rem' }}></div>

    </div>
  );
};
