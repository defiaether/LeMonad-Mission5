import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="logo">LeMonad</h1>
          <span className="tagline">Artists • Blockchain • Innovation</span>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link active">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a href="/profile" className="nav-link">
                Profile
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-primary">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 