import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import {
  fetchCognitiveScores,
  fetchCognitiveProgress,
} from "../../../../redux/slices/profileSlice";
import "./Cognitive.css";

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
  const outletContext = useOutletContext();
  const { userId, refetchTrigger } = outletContext;

  const dispatch = useDispatch();
  const { cognitiveScores, cognitiveProgress, loading, error } = useSelector(
    (state) => state.profile
  );

  const [selectedParameter, setSelectedParameter] = useState("Critical Thinking");

  const parameters = [
    "Critical Thinking",
    "Logical Thinking",
    "Linguistic Ability",
    "Memory",
    "Attention to Detail",
  ];

  useEffect(() => {
    if (userId) {
      dispatch(fetchCognitiveScores(userId));
      dispatch(fetchCognitiveProgress(userId));
    }
  }, [userId, refetchTrigger, dispatch]);

  const sortedProgressData = cognitiveProgress.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const progressLabels = sortedProgressData.map((entry) =>
    new Date(entry.created_at).toLocaleDateString("en-GB")
  );

  const progressData = {
    labels: progressLabels,
    datasets: [
      {
        label: `${selectedParameter} Progress`,
        data: sortedProgressData.map(
          (entry) => entry[selectedParameter.toLowerCase().replace(/\s/g, "_")]
        ),
        borderColor: "#3498db",
        fill: false,
      },
    ],
  };

  const scores = [
    cognitiveScores.critical_thinking,
    cognitiveScores.logical_thinking,
    cognitiveScores.linguistic_ability,
    cognitiveScores.memory,
    cognitiveScores.attention_to_detail,
  ];

  const scoresData = {
    labels: parameters,
    datasets: [
      {
        label: "Scores",
        data: scores,
        backgroundColor: [
          "#C53030",
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
          "#C53030",
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
    <div className="cognitive-analysis">
      <div className="cognitive-charts-row">
        <div className="cognitive-chart-container">
          <h3>Scores</h3>
          <div key={refetchTrigger} className="cognitive-chart-wrapper">
            <Bar data={scoresData} options={barChartOptions} />
          </div>
        </div>
        <div className="cognitive-chart-container">
          <h3>Distribution</h3>
          <div key={refetchTrigger} className="cognitive-chart-wrapper">
            <Pie data={distributionData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      <div className="cognitive-progress-section cognitive-chart-container">
        <div className="cognitive-progress-header">
          <h3>Progress</h3>
          <div className="cognitive-progress-controls">
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
        <div key={refetchTrigger} className="cognitive-chart-wrapper">
          <Line data={progressData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Cognitive;
