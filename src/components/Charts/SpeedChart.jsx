import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useDashboard } from '../../context/DashboardContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function SpeedChart() {
  const { issData } = useDashboard();
  const { speeds } = issData;

  if (!speeds || speeds.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-title">ISS Speed Over Time</h3>
        <p className="chart-empty">Collecting speed data...</p>
      </div>
    );
  }

  const labels = speeds.map((s) =>
    new Date(s.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Speed (km/h)',
        data: speeds.map((s) => s.speed.toFixed(0)),
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#00d4ff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `Speed: ${ctx.parsed.y} km/h`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', maxRotation: 45, font: { size: 10 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      y: {
        ticks: { color: '#94a3b8', callback: (v) => `${v} km/h` },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
  };

  return (
    <div className="chart-card">
      <h3 className="chart-title">📈 ISS Speed Over Time</h3>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
