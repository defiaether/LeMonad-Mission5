import React, { useState, useRef } from 'react';
import './Profile.css';
import { useAuth } from '../../components/common/AuthContext';

// Mock data - will be replaced with API calls
const mockProfile = {
  name: 'Sarah Johnson',
  profileImage: '/mock/artist1.jpg',
  bio: 'Digital artist specializing in surreal landscapes and abstract NFT collections. Creating unique pieces that blend traditional art with blockchain technology.',
  skills: ['Digital Art', 'NFT', '3D Modeling'],
  portfolio: [
    { id: 1, image: '/mock/portfolio1.jpg', title: 'Ethereal Dreams' },
    { id: 2, image: '/mock/portfolio2.jpg', title: 'Digital Wilderness' },
    { id: 3, image: '/mock/portfolio3.jpg', title: 'Abstract Thoughts' },
    { id: 4, image: '/mock/portfolio4.jpg', title: 'Future Vision' },
  ],
  servicePlans: [
    {
      tier: 'Bronze',
      price: 0.5,
      features: [
        'Basic artwork commission',
        'One revision',
        '7-day delivery',
        'Commercial use (Unavailable)',
        'Source files (Unavailable)',
        'Priority support (Unavailable)'
      ]
    },
    {
      tier: 'Silver',
      price: 1.0,
      features: [
        'Premium artwork commission',
        'Three revisions',
        '5-day delivery',
        'Source files',
        'Commercial use (Unavailable)',
        'Priority support (Unavailable)'
      ]
    },
    {
      tier: 'Gold',
      price: 2.0,
      features: [
        'Custom artwork collection',
        'Unlimited revisions',
        '3-day delivery',
        'Source files',
        'Commercial rights',
        'Priority support'
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      comment: 'Amazing work! Sarah captured exactly what I was looking for.'
    },
    {
      id: 2,
      author: 'Alice Smith',
      rating: 5,
      comment: 'Incredible attention to detail and great communication throughout the process.'
    }
  ],
  socialMedia: {
    twitter: 'https://twitter.com/sarahjohnson',
    instagram: 'https://instagram.com/sarahjohnsonart',
    behance: 'https://behance.net/sarahjohnson',
    linkedin: 'https://linkedin.com/in/sarahjohnsonart'
  }
};

const Profile: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState('/images/default_profile_picture.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [fadeMessage, setFadeMessage] = useState(false);

  React.useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
      setProfileImage(user.profile_picture_url || '/images/default_profile_picture.png');
    }
  }, [user]);

  React.useEffect(() => {
    if (message) {
      setFadeMessage(false);
      const fadeTimeout = setTimeout(() => setFadeMessage(true), 4000);
      const clearTimeoutId = setTimeout(() => setMessage(''), 5000);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(clearTimeoutId);
      };
    }
  }, [message]);

  if (!user) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontSize: '2rem', fontWeight: 'bold', color: '#ff3b3b'}}>
        login first!
      </div>
    );
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setUsername(user.username || '');
    setBio(user.bio || '');
    setProfilePicture(null);
    setProfileImage(user.profile_picture_url || '/images/default_profile_picture.png');
    setMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      if (profilePicture) formData.append('profile_picture', profilePicture);
      await updateProfile(formData);
      setMessage('Profile updated!');
      setEditing(false);
    } catch (err: any) {
      setMessage(err.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className={`profile-image-container${editing ? ' editable-bounce' : ''}`}> 
          <img src={profileImage} alt={username} className="profile-image" />
          {editing && (
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ marginTop: 8 }}
            />
          )}
        </div>
        <div className="profile-info" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {editing ? (
            <input
              type="text"
              value={username}
              maxLength={10}
              onChange={e => setUsername(e.target.value)}
              className="profile-edit-input editable-bounce"
              style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: 8, width: 180 }}
            />
          ) : (
            <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: 8, width: 180 }}>{username}</h1>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 140 }}>
            {editing ? (
              <>
                <button
                  className="btn-primary"
                  style={{ minWidth: 140, fontWeight: 'bold', marginBottom: 4 }}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="btn-secondary" style={{ minWidth: 100 }} onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn-primary" style={{ minWidth: 140, fontWeight: 'bold', marginBottom: 4 }} onClick={handleEdit}>
                Edit Profile
              </button>
            )}
            {message && (
              <div style={{ width: 140, textAlign: 'center', color: '#4fd1c5', fontWeight: 'bold', marginTop: 4, fontSize: '1em', alignSelf: 'center' }}>
                {message}
              </div>
            )}
          </div>
        </div>
        <div className="profile-email" style={{ fontWeight: 'bold', marginTop: 8 }}>{user.email}</div>
      </section>

      <section className="bio-section">
        <h2>About Me</h2>
        {editing ? (
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="profile-edit-input editable-bounce"
            style={{ width: '100%', minHeight: 60, fontSize: '1.1em', marginBottom: 8 }}
          />
        ) : (
          <p>{bio || 'tell about yourself...'}</p>
        )}
      </section>

      <section className="portfolio-section">
        <h2>Portfolio</h2>
        <div className="portfolio-grid">
          {mockProfile.portfolio.map(item => (
            <div key={item.id} className="portfolio-item">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                className="portfolio-image" 
              />
              <div className="portfolio-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="service-plans-section">
        <h2>Service Plans</h2>
        <div className="plans-container">
          {mockProfile.servicePlans.map(plan => (
            <div key={plan.tier} className="plan-card">
              <h3>{plan.tier}</h3>
              <div className="plan-price">
                <span className="amount">{plan.price}</span>
                <span className="currency">ETH</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn-secondary">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews-section">
        <h2>Client Reviews</h2>
        <div className="reviews-container">
          {mockProfile.reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h4>{review.author}</h4>
                <div className="rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="social-media-section">
        <h2>Connect With Me</h2>
        <div className="social-links">
          {Object.entries(mockProfile.socialMedia).map(([platform, url]) => (
            <a 
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link ${platform}`}
            >
              <i className={`fab fa-${platform}`}></i>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile; 