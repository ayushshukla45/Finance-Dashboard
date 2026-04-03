/**
 * Dashboard Landing - High-level financial summary and trend visualization.
 * Integrates SummaryCards, ChartSection, and Insights into a unified view.
 */
import React from 'react';
import { SummaryCards } from '../Dashboard/SummaryCards';
import { ChartSection } from '../Dashboard/ChartSection';
import { Insights } from '../Dashboard/Insights';

export const OverviewTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SummaryCards />
      <ChartSection />
      <div style={{ animationDelay: '0.4s' }} className="animate-fade-in">
        <Insights />
      </div>
    </div>
  );
};
