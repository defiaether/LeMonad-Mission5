import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onOpenSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose, onOpenSignIn }) => {
  const { signup, signUpError, setSignUpError, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUsername('');
      setEmail('');
      setPassword('');
      setProfilePicture(null);
      setLocalError(null);
      setSignUpError && setSignUpError(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!username || !email || !password) {
      setLocalError('All fields are required.');
      return;
    }
    if (username.length > 10) {
      setLocalError('Username must be at most 10 characters.');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) formData.append('profile_picture', profilePicture);
    try {
      await signup(formData);
      onClose();
      onOpenSignIn(); // Only switch after successful sign-up
    } catch (err) {
      // Do not close or switch modal on error
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay modal-visible" style={{display: 'flex'}}>
      <div className="modal-bg-box" style={{maxWidth: 400, width: '100%'}}>
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="auth-modal-form">
            <h2 style={{textAlign: 'center', marginBottom: 24}}>Sign Up</h2>
            {(localError || signUpError) && (
              <div style={{ color: '#ff3b3b', fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
                {localError || signUpError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={10}
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-profile-picture">Profile Picture</label>
              <input
                id="signup-profile-picture"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="form-actions" style={{justifyContent: 'center'}}>
              <button type="submit" className="btn-primary btn-header" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              <button type="button" className="btn-secondary btn-header" style={{marginLeft: 12}} onClick={onClose}>
                Cancel
              </button>
            </div>
            <div style={{textAlign: 'center', marginTop: 16}}>
              <span>Already have an account?{' '}
                <button type="button" className="link-btn" onClick={() => { onClose(); onOpenSignIn(); }}>
                  Sign in
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal; 