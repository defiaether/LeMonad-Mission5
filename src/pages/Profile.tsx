import React from 'react';
import './Profile.css';

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
  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-image-container">
          <img src={mockProfile.profileImage} alt={mockProfile.name} className="profile-image" />
        </div>
        <div className="profile-info">
          <h1>{mockProfile.name}</h1>
          <div className="skills">
            {mockProfile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bio-section">
        <h2>About Me</h2>
        <p>{mockProfile.bio}</p>
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