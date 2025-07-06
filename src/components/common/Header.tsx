import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { useAuth } from './AuthContext';
import SoonModal from './SoonModal';

interface HeaderProps {
  onCreateClick?: () => void;
  onSignInClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick, onSignInClick }) => {
  const location = useLocation();
  const { user, logout, loading } = useAuth();
  const [logoutHover, setLogoutHover] = useState(false);
  const [soonModalOpen, setSoonModalOpen] = useState(false);
  
  useEffect(() => {
    setLogoutHover(false);
  }, [user]);

  useEffect(() => {
    if (soonModalOpen) {
      const timer = setTimeout(() => {
        setSoonModalOpen(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [soonModalOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <img src="/images/LeMonad_LOGO.png" alt="LeMonad Logo" className="lemonad-logo" />
          <h1 className="logo">LeMonad</h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className={`nav-link${location.pathname === '/' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setSoonModalOpen(true); }}>
                Discover
              </a>
            </li>
            <li className="nav-item">
              <a href="/explore" className={`nav-link${location.pathname === '/explore' ? ' active' : ''}`}>
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className={`nav-link${location.pathname === '/profile' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setSoonModalOpen(true); }}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          {user ? (
            <button className="btn-secondary btn-header" onClick={onCreateClick} style={{marginRight: 12}}>
              Create
            </button>
          ) : (
            <div style={{ display: 'inline-block', minWidth: 100, width: 100, height: 40, marginRight: 12 }} />
          )}
          {user ? (
            <>
              <button
                className="btn-primary btn-header"
                onClick={logout}
                disabled={loading}
                onMouseEnter={() => setLogoutHover(true)}
                onMouseLeave={() => setLogoutHover(false)}
                style={{ minWidth: 100 }}
              >
                {logoutHover ? 'Logout' : user.username}
                {user.is_verified && !logoutHover && <span className="verified-badge" title="Verified">✔</span>}
              </button>
            </>
          ) : (
            <button className="btn-primary btn-header" onClick={e => { e.preventDefault(); setSoonModalOpen(true); }}>
              Sign-in
            </button>
          )}
        </div>
      </div>
      <SoonModal open={soonModalOpen} onClose={() => setSoonModalOpen(false)} />
    </header>
  );
};

export default Header; 