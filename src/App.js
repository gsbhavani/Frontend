// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BarChart from './components/BarChart';
import LineGraph from './components/LineGraph';
import PieGraph from './components/PieGraph';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Total Sales</Link></li>
            <li><Link to="/BarChart">BarChart</Link></li>
            <li><Link to="/LineGraph">LineGraph</Link></li>
            <li><Link to="/PieGraph">PieGraph</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/BarChart" element={<BarChart />} />
          <Route path="/LineGraph" element={<LineGraph />} />
          <Route path="/PieGraph" element={<PieGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
