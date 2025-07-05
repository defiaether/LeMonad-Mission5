import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="logo">LeMonad</h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
                Discover
              </a>
            </li>
            <li className="nav-item">
              <a href="/profile" className={`nav-link${location.pathname === '/profile' ? ' active' : ''}`}>
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