import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register the required chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderBarChart = () => {
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
          const labels = data.map((orders) =>
            new Date(orders.createdAt).toLocaleDateString()
          ); // Convert to readable date format
          const totalprices = data.map((orders) => orders.totalPrice); // Extract totalPrice

          // Debugging: Log the extracted labels and totalSales
          console.log("Labels (Dates):", labels);
          console.log("Total Sales:", totalprices);

          // Set the chart data
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Total Prices",
                data: totalprices,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
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
      <h2>Order Sales Bar Chart</h2>
      {error ? (
        <p style={{ color: "black" }}>{error}</p>
      ) : (
        <div style={{ width: "2000px", height: "500px" }}>  {/* Adjust width and height here */}
          <Bar data={chartData} />
        </div>
        
      )}
    </div>
  );
};

export default OrderBarChart;