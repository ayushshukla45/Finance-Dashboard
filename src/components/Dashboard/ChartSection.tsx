import React, { useMemo, useState, useEffect } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatChartData } from '../../utils/formatChartData';

/**
 * Chart Section Component - Handles financial trend and distribution visualization.
 * Using ResponsiveContainer with fixed aspect ratios to prevent layout shifts.
 */
export const ChartSection: React.FC = () => {
  const { transactions } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { trendData, pieData } = useMemo(() => formatChartData(transactions), [transactions]);

  const COLORS = ['#00E5FF', '#00B8CC', '#BFFF00', '#FFAB00', '#FF2B4A', '#818cf8'];

  if (!isMounted) {
    return <div style={{ minHeight: '400px', width: '100%' }} />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      {/* Area Chart: Balance Trend */}
      <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', minHeight: '400px', width: '100%' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Balance Trend</h3>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%" aspect={2} debounce={100} minHeight={300}>
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--primary-accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--primary-accent)', borderRadius: '8px', color: 'var(--text-primary)', boxShadow: 'var(--shadow-glow)' }}
                itemStyle={{ color: 'var(--primary-accent)', fontFamily: 'JetBrains Mono' }}
              />
              <Area type="monotone" dataKey="balance" stroke="var(--primary-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart: Spending Distribution */}
      <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', minHeight: '400px', width: '100%' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Spending Distribution</h3>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%" aspect={2} debounce={100} minHeight={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="var(--bg-color)"
                strokeWidth={4}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--primary-accent)', borderRadius: '8px', color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
