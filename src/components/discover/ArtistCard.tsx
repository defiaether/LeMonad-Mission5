import React from 'react';
import './ArtistCard.css';

interface ArtistCardProps {
  name: string;
  profileImage: string;
  skills: string[];
  likes: number;
  comments: number;
  bio: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  profileImage,
  skills,
  likes,
  comments,
  bio
}) => {
  return (
    <div className="artist-card">
      <div className="artist-card-header">
        <div className="artist-image-container">
          <img src={profileImage} alt={name} className="artist-image" />
        </div>
        <div className="artist-info">
          <h3 className="artist-name">{name}</h3>
          <div className="artist-skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <p className="artist-bio">{bio}</p>
      
      <div className="artist-card-footer">
        <div className="engagement">
          <div className="likes">
            <i className="far fa-heart"></i>
            <span>{likes}</span>
          </div>
          <div className="comments">
            <i className="far fa-comment"></i>
            <span>{comments}</span>
          </div>
        </div>
        <button className="btn-secondary">View Profile</button>
      </div>
    </div>
  );
};

export default ArtistCard; 