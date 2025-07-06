import React, { useState } from 'react';
import { useAuth } from '../components/common/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  if (!user) return <div className="profile-container">Please sign in to view your profile.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const formData = new FormData();
      if (username) formData.append('username', username);
      if (email) formData.append('email', email);
      if (password) formData.append('password', password);
      if (profilePicture) formData.append('profile_picture', profilePicture);
      
      await updateProfile(formData);
      setMessage('Profile updated!');
    } catch (err: any) { console.error('Signup error:', err);
      setMessage(err.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-header">
        <div className="profile-picture">
          {user.profile_picture_url ? (
            <img src={user.profile_picture_url} alt="Profile" />
          ) : (
            <div className="profile-placeholder">{user.username[0]}</div>
          )}
        </div>
        <div className="profile-info">
          <span className="profile-username">
            {user.username}
            {user.is_verified && <span className="verified-badge" title="Verified">✔</span>}
          </span>
          <span className="profile-email">{user.email}</span>
        </div>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            maxLength={10}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </label>
        <label>
          Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={e => setProfilePicture(e.target.files?.[0] || null)}
          />
        </label>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {message && <div className="profile-message">{message}</div>}
      </form>
    </div>
  );
};

export default Profile; 