import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Import Pie instead of Line
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement, // Pie chart uses ArcElement
  Title,
  Tooltip,
  Legend,  // Legend is important for Pie Charts
} from 'chart.js';
import axios from "axios";

// Register the necessary elements for Pie chart
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const PieGraph = () => {
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

          // Set the chart data
          setChartData({
            labels: labels,  // Labels represent different slices
            datasets: [
              {
                label: "Total Sales",
                data: totalSales,  // Data for each slice
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)"
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
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
  
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "500px" }}>
        
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
       
        <div style={{ width: "500px", height: "500px" }}>  {/* Adjust width and height here */}
         <h2 style={{ textAlign: "center" }}>Sales Pie Chart</h2> 
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default PieGraph;