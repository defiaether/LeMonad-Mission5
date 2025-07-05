import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Discover from './pages/Discover/Discover';
import Explore from './pages/Explore/Explore';
import Profile from './pages/Profile/Profile';
import CreatePost from './components/explore/CreatePost';
import './App.css';
import './pages/Explore/Explore.css';

// Move Post and Comment interfaces here
export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  artistName: string;
  artistAvatar: string;
  title: string;
  description: string;
  image: string;
  imageFormat: '4:3' | '16:9' | '1:1' | 'custom';
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

const initialPosts: Post[] = [
  {
    id: '1',
    artistName: 'Sarah Chen',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Digital Dreams',
    description: 'Exploring the intersection of traditional art and digital innovation. This piece represents the fusion of classical techniques with modern technology.',
    image: '/images/1.jpg',
    imageFormat: '16:9',
    createdAt: new Date('2024-01-15T10:30:00'),
    likes: 42,
    comments: [
      {
        id: '1',
        userName: 'ArtLover',
        userAvatar: '/mock/artist2.jpg',
        content: 'Absolutely stunning! The color palette is mesmerizing.',
        createdAt: new Date('2024-01-15T11:00:00')
      }
    ],
    isLiked: false
  },
  {
    id: '2',
    artistName: 'Marcus Rodriguez',
    artistAvatar: '/mock/artist2.jpg',
    title: 'Urban Symphony',
    description: 'A collection of street photography capturing the rhythm of city life. Each frame tells a story of urban existence.',
    image: '/images/2.jpg',
    imageFormat: '4:3',
    createdAt: new Date('2024-01-14T15:45:00'),
    likes: 28,
    comments: [],
    isLiked: true
  },
  {
    id: '3',
    artistName: 'Emma Thompson',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Abstract Emotions',
    description: 'This series explores the raw emotions we experience daily, translated into abstract visual language.',
    image: '/images/3.jpg',
    imageFormat: '1:1',
    createdAt: new Date('2024-01-13T09:20:00'),
    likes: 67,
    comments: [
      {
        id: '2',
        userName: 'CreativeMind',
        userAvatar: '/mock/artist2.jpg',
        content: 'The composition is incredible!',
        createdAt: new Date('2024-01-13T10:15:00')
      },
      {
        id: '3',
        userName: 'ArtCollector',
        userAvatar: '/mock/artist1.jpg',
        content: 'Would love to see more from this series!',
        createdAt: new Date('2024-01-13T14:30:00')
      }
    ],
    isLiked: false
  },
  {
    id: '4',
    artistName: 'Alex Rivera',
    artistAvatar: '/mock/artist2.jpg',
    title: "Nature's Canvas",
    description: 'Capturing the raw beauty of natural landscapes through the lens of contemporary photography.',
    image: '/images/4.jpg',
    imageFormat: '16:9',
    createdAt: new Date('2024-01-12T14:20:00'),
    likes: 89,
    comments: [
      {
        id: '4',
        userName: 'NatureLover',
        userAvatar: '/mock/artist1.jpg',
        content: 'This takes my breath away!',
        createdAt: new Date('2024-01-12T15:00:00')
      }
    ],
    isLiked: false
  },
  {
    id: '5',
    artistName: 'Maya Patel',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Cultural Fusion',
    description: 'A celebration of diverse cultural influences in modern art, blending traditional motifs with contemporary expression.',
    image: '/images/5.jpg',
    imageFormat: '4:3',
    createdAt: new Date('2024-01-11T11:15:00'),
    likes: 156,
    comments: [
      {
        id: '5',
        userName: 'ArtEnthusiast',
        userAvatar: '/mock/artist2.jpg',
        content: 'The cultural elements are beautifully integrated!',
        createdAt: new Date('2024-01-11T12:30:00')
      },
      {
        id: '6',
        userName: 'Designer',
        userAvatar: '/mock/artist1.jpg',
        content: 'Love the color harmony in this piece.',
        createdAt: new Date('2024-01-11T16:45:00')
      }
    ],
    isLiked: true
  },
  {
    id: '6',
    artistName: 'David Kim',
    artistAvatar: '/mock/artist2.jpg',
    title: 'Minimalist Elegance',
    description: 'Exploring the power of simplicity and negative space in contemporary design.',
    image: '/images/6.jpg',
    imageFormat: '1:1',
    createdAt: new Date('2024-01-10T09:45:00'),
    likes: 203,
    comments: [],
    isLiked: false
  },
  {
    id: '7',
    artistName: 'Lisa Zhang',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Urban Geometry',
    description: 'Finding beauty in the geometric patterns of city architecture and urban landscapes.',
    image: '/images/7.jpg',
    imageFormat: '16:9',
    createdAt: new Date('2024-01-09T16:30:00'),
    likes: 78,
    comments: [
      {
        id: '7',
        userName: 'CityExplorer',
        userAvatar: '/mock/artist2.jpg',
        content: 'Perfect capture of urban aesthetics!',
        createdAt: new Date('2024-01-09T17:15:00')
      }
    ],
    isLiked: false
  },
  {
    id: '8',
    artistName: 'Carlos Mendez',
    artistAvatar: '/mock/artist2.jpg',
    title: 'Vibrant Expressions',
    description: 'A burst of color and emotion through abstract expressionism and bold brushstrokes.',
    image: '/images/8.jpg',
    imageFormat: '4:3',
    createdAt: new Date('2024-01-08T13:20:00'),
    likes: 134,
    comments: [
      {
        id: '8',
        userName: 'ColorLover',
        userAvatar: '/mock/artist1.jpg',
        content: 'The energy in this piece is incredible!',
        createdAt: new Date('2024-01-08T14:00:00')
      }
    ],
    isLiked: true
  },
  {
    id: '9',
    artistName: 'Sophie Anderson',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Digital Harmony',
    description: 'A fusion of digital art and traditional painting techniques, creating a unique visual language.',
    image: '/images/10.jpg',
    imageFormat: '16:9',
    createdAt: new Date('2024-01-07T12:10:00'),
    likes: 92,
    comments: [
      {
        id: '9',
        userName: 'DigitalArtist',
        userAvatar: '/mock/artist2.jpg',
        content: 'The technique is revolutionary!',
        createdAt: new Date('2024-01-07T13:00:00')
      }
    ],
    isLiked: false
  },
  {
    id: '10',
    artistName: 'James Wilson',
    artistAvatar: '/mock/artist2.jpg',
    title: 'Architectural Poetry',
    description: 'Exploring the relationship between form, function, and beauty in modern architecture.',
    image: '/images/14.jpg',
    imageFormat: '4:3',
    createdAt: new Date('2024-01-06T10:30:00'),
    likes: 167,
    comments: [],
    isLiked: true
  },
  {
    id: '11',
    artistName: 'Nina Rodriguez',
    artistAvatar: '/mock/artist1.jpg',
    title: 'Color Symphony',
    description: 'A celebration of color theory and its emotional impact in contemporary art.',
    image: '/images/15.jpg',
    imageFormat: '1:1',
    createdAt: new Date('2024-01-05T15:45:00'),
    likes: 234,
    comments: [
      {
        id: '10',
        userName: 'ColorTheory',
        userAvatar: '/mock/artist2.jpg',
        content: 'The color combinations are perfect!',
        createdAt: new Date('2024-01-05T16:30:00')
      },
      {
        id: '11',
        userName: 'ArtStudent',
        userAvatar: '/mock/artist1.jpg',
        content: 'This is exactly what I needed for my thesis!',
        createdAt: new Date('2024-01-05T18:15:00')
      }
    ],
    isLiked: false
  },
  {
    id: '12',
    artistName: 'Michael Chang',
    artistAvatar: '/mock/artist2.jpg',
    title: 'Urban Reflections',
    description: 'Capturing the beauty of city life through reflective surfaces and urban geometry.',
    image: '/images/16.png',
    imageFormat: 'custom',
    createdAt: new Date('2024-01-04T09:20:00'),
    likes: 145,
    comments: [
      {
        id: '12',
        userName: 'UrbanPhotographer',
        userAvatar: '/mock/artist1.jpg',
        content: 'The reflections are perfectly captured!',
        createdAt: new Date('2024-01-04T10:00:00')
      }
    ],
    isLiked: false
  }
];

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      isLiked: false
    };
    setPosts([post, ...posts]);
  };

  return (
    <Router>
      <div className="app">
        <Header onCreateClick={() => setShowModal(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/explore" element={<Explore posts={posts} setPosts={setPosts} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <div className={`modal-overlay${showModal ? ' modal-visible' : ''}`} style={{display: showModal ? 'flex' : 'none'}}>
          <div className="modal-bg-box">
            <div className="modal-content">
              <CreatePost
                onCreatePost={(post) => {
                  handleCreatePost(post);
                  setShowModal(false);
                }}
                formRef={formRef}
              />
              <div className="modal-actions">
                <button className="btn-primary" style={{minWidth: 120, marginRight: 8}} onClick={() => formRef.current && formRef.current.requestSubmit()}>Create</button>
                <button className="btn-secondary" style={{minWidth: 100}} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App; 