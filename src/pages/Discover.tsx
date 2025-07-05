import React from 'react';
import ArtistCard from '../components/explore/ArtistCard';
import './Discover.css';

// Temporary mock data - will be replaced with API calls
const mockArtists = [
  {
    id: 1,
    name: 'Sarah Johnson',
    profileImage: '/mock/artist1.jpg',
    skills: ['Digital Art', 'NFT', '3D Modeling'],
    likes: 1234,
    comments: 89,
    bio: 'Digital artist specializing in surreal landscapes and abstract NFT collections. Creating unique pieces that blend traditional art with blockchain technology.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    profileImage: '/mock/artist2.jpg',
    skills: ['Illustration', 'Animation', 'Character Design'],
    likes: 856,
    comments: 42,
    bio: 'Passionate illustrator and animator bringing characters to life through digital art. Focused on creating engaging storytelling through visual art.'
  }
];

const Discover: React.FC = () => {
  return (
    <div className="discover-page">
      <section className="hero-section">
        <h1>Discover Talented Artists</h1>
        <p>Connect with creative minds in the blockchain space</p>
      </section>

      <section className="artists-grid">
        {mockArtists.map(artist => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            profileImage={artist.profileImage}
            skills={artist.skills}
            likes={artist.likes}
            comments={artist.comments}
            bio={artist.bio}
          />
        ))}
      </section>
    </div>
  );
};

export default Discover; 