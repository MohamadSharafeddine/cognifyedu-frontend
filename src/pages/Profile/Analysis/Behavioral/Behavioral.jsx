import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import axios from "../../../../utils/axios";
import "./Behavioral.css";

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
  const outletContext = useOutletContext();
  const userId = outletContext?.userId;

  const [behavioralData, setBehavioralData] = useState({
    engagement: 0,
    time_management: 0,
    adaptability: 0,
    collaboration: 0,
    focus: 0,
  });

  const [progressDataArray, setProgressDataArray] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState("Engagement");

  const parameters = [
    "Engagement",
    "Time Management",
    "Adaptability",
    "Collaboration",
    "Focus",
  ];

  useEffect(() => {
    const fetchBehavioralData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/behavioral-scores/${userId}/average`);
          setBehavioralData(response.data);

          const progressResponse = await axios.get(`/behavioral-scores/${userId}/progress`);
          setProgressDataArray(progressResponse.data);
        }
      } catch (error) {
        console.error("Error fetching behavioral data:", error);
      }
    };

    fetchBehavioralData();
  }, [userId]);

  const scores = [
    behavioralData.engagement,
    behavioralData.time_management,
    behavioralData.adaptability,
    behavioralData.collaboration,
    behavioralData.focus,
  ];

  const progressLabels = progressDataArray.map((_, index) => `Day ${index + 1}`);

  const progressData = {
    labels: progressLabels,
    datasets: [
      {
        label: `${selectedParameter} Progress`,
        data: progressDataArray.map((entry) => entry[selectedParameter.toLowerCase().replace(/\s/g, "_")]),
        borderColor: "#3498db",
        fill: false,
      },
    ],
  };

  const scoresData = {
    labels: parameters,
    datasets: [
      {
        label: "Scores",
        data: scores,
        backgroundColor: [
          "#e74c3c",
          "#3498db",
          "#1abc9c",
          "#f1c40f",
          "#9b59b6",
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
          "#e74c3c",
          "#3498db",
          "#1abc9c",
          "#f1c40f",
          "#9b59b6",
        ],
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#000",
        },
      },
      y: {
        ticks: {
          color: "#000",
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
        position: "right",
        align: "center",
        labels: {
          color: "#000",
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
          color: "#000",
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#000",
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
          <div style={{ height: "200px" }}>
            <Bar data={scoresData} options={barChartOptions} />
          </div>
        </div>
        <div className="chart-section chart-container">
          <h3>Distribution</h3>
          <div style={{ height: "200px" }}>
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
        <div style={{ height: "200px" }}>
          <Line data={progressData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Behavioral;
