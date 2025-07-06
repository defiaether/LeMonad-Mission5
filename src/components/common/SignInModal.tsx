import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ open, onClose, onOpenSignUp }) => {
  const { login, signInError, setSignInError, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setLocalError(null);
      setSignInError && setSignInError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!username || !password) {
      setLocalError('Username and password required.');
      return;
    }
    try {
      await login(username, password);
      onClose(); // Only close on success
    } catch (err) {
      // Do not close modal on error
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay modal-visible" style={{display: 'flex'}}>
      <div className="modal-bg-box" style={{maxWidth: 400, width: '100%'}}>
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="auth-modal-form">
            <h2 style={{textAlign: 'center', marginBottom: 24}}>Sign In</h2>
            {(localError || signInError) && (
              <div className="auth-error" style={{ color: '#ff3b3b', fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
                {localError || signInError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="signin-username">Username</label>
              <input
                id="signin-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                maxLength={10}
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="form-actions" style={{justifyContent: 'center'}}>
              <button type="submit" className="btn-primary btn-header" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <button type="button" className="btn-secondary btn-header" style={{marginLeft: 12}} onClick={onClose}>
                Cancel
              </button>
            </div>
            <div style={{textAlign: 'center', marginTop: 16}}>
              <span>Don't have an account?{' '}
                <button type="button" className="link-btn" onClick={() => { onClose(); onOpenSignUp(); }}>
                  Sign up
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 