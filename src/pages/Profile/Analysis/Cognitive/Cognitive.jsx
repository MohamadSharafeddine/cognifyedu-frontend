import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
// import axios from 'axios';
import './Cognitive.css';

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

const Cognitive = () => {
  const parameters = ['Critical Thinking', 'Logical Thinking', 'Linguistic Ability', 'Memory', 'Attention to Detail'];

  const [selectedParameter, setSelectedParameter] = useState('Critical Thinking');

  const [cognitiveData, setCognitiveData] = useState({
    critical_thinking: 85,
    logical_thinking: 75,
    linguistic_ability: 60,
    memory: 90,
    attention_to_detail: 70
  });
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/cognitive-scores');
        setCognitiveData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  */

  if (loading) {
    return <div>Loading...</div>;
  }

  const scores = [
    cognitiveData.critical_thinking,
    cognitiveData.logical_thinking,
    cognitiveData.linguistic_ability,
    cognitiveData.memory,
    cognitiveData.attention_to_detail
  ];

  const scoresData = {
    labels: parameters,
    datasets: [
      {
        label: 'Scores',
        data: scores, 
        backgroundColor: [
          '#e74c3c',
          '#3498db',
          '#1abc9c',
          '#f1c40f',
          '#9b59b6'
        ],
      },
    ],
  };

  const distributionData = {
    labels: parameters,
    datasets: [
      {
        data: scores,
        backgroundColor: [
          '#e74c3c',
          '#3498db',
          '#1abc9c',
          '#f1c40f',
          '#9b59b6'
        ],
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

  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        ticks: {
          color: '#000',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#000',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="behavioral-analysis">
      <div className="charts-container">
        <div className="chart-section chart-container">
          <h3>Scores</h3>
          <div style={{ height: '200px' }}>
            <Bar data={scoresData} options={barChartOptions} />
          </div>
        </div>
        <div className="chart-section chart-container">
          <h3>Distribution</h3>
          <div style={{ height: '200px' }}>
            <Pie data={distributionData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      <div className="progress-section chart-container">
        <div className="progress-header">
          <h3>Progress</h3>
          <div className="progress-controls">
            <label htmlFor="parameter-select">Select Parameter: </label>
            <select
              id="parameter-select"
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
        </div>
        <div style={{ height: '200px' }}>
          <Line data={progressData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Cognitive;
