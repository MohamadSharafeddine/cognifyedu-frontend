import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import './Behavioral.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Behavioral = () => {
  const parameters = ['Engagement', 'Time Management', 'Adaptability', 'Collaboration', 'Focus'];
  const [selectedParameter, setSelectedParameter] = useState('Engagement');
  const [behavioralData] = useState({
    engagement: 85,
    time_management: 75,
    adaptability: 60,
    collaboration: 90,
    focus: 70,
  });

  const scores = [
    behavioralData.engagement,
    behavioralData.time_management,
    behavioralData.adaptability,
    behavioralData.collaboration,
    behavioralData.focus,
  ];

  const scoresData = {
    labels: parameters,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        backgroundColor: ['#e74c3c', '#3498db', '#1abc9c', '#f1c40f', '#9b59b6'],
      },
    ],
  };

  const distributionData = {
    labels: parameters,
    datasets: [
      {
        data: scores,
        backgroundColor: ['#e74c3c', '#3498db', '#1abc9c', '#f1c40f', '#9b59b6'],
      },
    ],
  };

  const progressData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: `${selectedParameter} Progress`,
        data: [20, 45, 50, 60, 75, 65, 85],
        borderColor: '#3498db',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="behavioral-analysis">
      <div className="charts-container">
        <div className="chart-section chart-container">
          <h3>Scores</h3>
          <div style={{ height: '200px' }}>
            <Bar data={scoresData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-section chart-container">
          <h3>Distribution</h3>
          <div style={{ height: '200px' }}>
            <Pie data={distributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="progress-section chart-container">
        <div className="progress-header">
          <h3>Progress</h3>
          <select
            value={selectedParameter}
            onChange={(e) => setSelectedParameter(e.target.value)}
          >
            {parameters.map((param, index) => (
              <option key={index} value={param}>
                {param}
              </option>
            ))}
          </select>
        </div>
        <div style={{ height: '200px' }}>
          <Line data={progressData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Behavioral;
