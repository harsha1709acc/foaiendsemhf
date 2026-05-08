import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboard } from '../../context/DashboardContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export function NewsChart() {
  const { newsData } = useDashboard();
  const { articles } = newsData;

  const categories = Object.keys(articles);
  const counts = categories.map((cat) => articles[cat]?.length || 0);

  if (categories.length === 0 || counts.every((c) => c === 0)) {
    return (
      <div className="chart-card">
        <h3 className="chart-title">News Distribution</h3>
        <p className="chart-empty">Loading news data...</p>
      </div>
    );
  }

  const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const data = {
    labels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [
      {
        data: counts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: 'rgba(15, 23, 42, 0.8)',
        borderWidth: 3,
        hoverBorderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 12,
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed} articles`,
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <h3 className="chart-title">📊 News Distribution by Category</h3>
      <div className="chart-wrapper chart-wrapper-pie">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
