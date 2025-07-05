import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 