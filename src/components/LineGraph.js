import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,    // Line chart needs LineElement
  PointElement,   // Points on the line
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from "axios";

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null); // To capture errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get("http://localhost:8080/api/orders");
        const data = response.data;

        // Debugging: Log API response
        console.log("API response data:", data);

        // Check if data exists and is an array before mapping
        if (Array.isArray(data)) {
          // Extracting the createdAt date as labels and totalPrice as data for the chart
          const labels = data.map((order) =>
            new Date(order.createdAt).toLocaleDateString()
          ); // Convert to readable date format
          const totalSales = data.map((order) => order.totalPrice); // Extract totalPrice

          // Debugging: Log the extracted labels and totalSales
          console.log("Labels (Dates):", labels);
          console.log("Total Sales:", totalSales);

          // Set the chart data for line graph
          setChartData({
            labels: labels,  // X-axis: dates (order createdAt)
            datasets: [
              {
                label: "Total Sales",  // Label for the dataset
                data: totalSales,  // Y-axis: sales values
                backgroundColor: "rgba(75,192,192,0.4)",  // Area under the line
                borderColor: "rgba(75,192,192,1)",  // Line color
                pointBackgroundColor: "rgba(75,192,192,1)", // Point color
                pointBorderColor: "#fff", // Border color of the points
                pointHoverBackgroundColor: "#fff", // Point color on hover
                pointHoverBorderColor: "rgba(75,192,192,1)", // Border color on hover
                fill: true,  // Fill the area under the line
                tension: 0.4,  // Controls the curve of the line (set to 0 for a straight line)
              },
            ],
          });
        } else {
          // Debugging: Log if the data is not in the expected format
          console.error("Data is not an array:", data);
          setError("Data format is incorrect");
        }
      } catch (error) {
        // Handle and log errors in fetching the data
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sales Line Chart</h2>
      {error ? (
        <p style={{ color: "Red" }}>{error}</p>
      ) : (
        <div style={{ width: "1400px", height: "500px" }}>  {/* Adjust width and height here */}
          <Line data={chartData} options={{ maintainAspectRatio: false }} /> {/* Ensures the aspect ratio is not locked */}
        </div>
      )}
    </div>
  );
};
export default LineGraph;
