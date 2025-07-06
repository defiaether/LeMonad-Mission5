import React from 'react';
import './LoadingPage.css';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="loading-logo">
          <h1>LeMonad</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">
          <p>Loading amazing content...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 