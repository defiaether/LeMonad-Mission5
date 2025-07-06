import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Discover from './pages/Discover/Discover';
import Explore from './pages/Explore/Explore';
import Profile from './pages/Profile/Profile';
import CreatePost from './components/explore/CreatePost';
import SignInModal from './components/common/SignInModal';
import SignUpModal from './components/common/SignUpModal';
import { AuthProvider } from './components/common/AuthContext';
import LoadingPage from './components/common/LoadingPage';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  likes: number;
  isLiked: boolean;
  comments: Array<{
    id: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Simulate loading time for assets, data, etc.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (postData: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      isLiked: false
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const initialPosts: Post[] = [
    {
      id: '1',
      title: 'Digital Art Collection',
      description: 'Exploring the boundaries of digital creativity with this new collection.',
      imageUrl: '/images/1.jpg',
      author: {
        name: 'Alex Chen',
        avatar: '/images/2.jpg',
        verified: true
      },
      likes: 42,
      isLiked: false,
      comments: [
        {
          id: '1',
          userName: 'Sarah Kim',
          userAvatar: '/images/3.jpg',
          content: 'Absolutely stunning work!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Abstract Photography',
      description: 'Capturing the essence of urban life through abstract lens.',
      imageUrl: '/images/4.jpg',
      author: {
        name: 'Maria Garcia',
        avatar: '/images/5.jpg'
      },
      likes: 28,
      isLiked: false,
      comments: [
        {
          id: '2',
          userName: 'David Lee',
          userAvatar: '/images/6.jpg',
          content: 'Love the composition!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Modern Sculpture',
      description: 'A contemporary take on classical sculpture forms.',
      imageUrl: '/images/7.jpg',
      author: {
        name: 'James Wilson',
        avatar: '/images/8.jpg'
      },
      likes: 35,
      isLiked: false,
      comments: [
        {
          id: '3',
          userName: 'Emma Thompson',
          userAvatar: '/images/9.jpg',
          content: 'Incredible craftsmanship!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Watercolor Dreams',
      description: 'Soft, dreamy watercolor paintings that transport you to another world.',
      imageUrl: '/images/10.jpg',
      author: {
        name: 'Sophie Anderson',
        avatar: '/images/14.jpg'
      },
      likes: 51,
      isLiked: false,
      comments: [
        {
          id: '4',
          userName: 'Michael Brown',
          userAvatar: '/images/15.jpg',
          content: 'So ethereal and beautiful!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Street Art Revolution',
      description: 'Bold, vibrant street art that challenges societal norms.',
      imageUrl: '/images/16.png',
      author: {
        name: 'Carlos Rodriguez',
        avatar: '/images/17.jpg'
      },
      likes: 67,
      isLiked: false,
      comments: [
        {
          id: '5',
          userName: 'Lisa Wang',
          userAvatar: '/images/18.jpg',
          content: 'Powerful message through art!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '6',
      title: 'Minimalist Design',
      description: 'Less is more - exploring the beauty of simplicity.',
      imageUrl: '/images/19.jpg',
      author: {
        name: 'Anna Kowalski',
        avatar: '/images/20.jpg'
      },
      likes: 39,
      isLiked: false,
      comments: [
        {
          id: '6',
          userName: 'Tom Harris',
          userAvatar: '/images/21.jpg',
          content: 'Clean and elegant!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '7',
      title: 'Nature Photography',
      description: 'Capturing the raw beauty of untouched landscapes.',
      imageUrl: '/images/22.jpg',
      author: {
        name: 'Rachel Green',
        avatar: '/images/23.jpg'
      },
      likes: 44,
      isLiked: false,
      comments: [
        {
          id: '7',
          userName: 'Kevin Martinez',
          userAvatar: '/images/24.jpg',
          content: 'Nature at its finest!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '8',
      title: 'Digital Portraits',
      description: 'Modern digital portraits with a unique artistic twist.',
      imageUrl: '/images/25.png',
      author: {
        name: 'Daniel Kim',
        avatar: '/images/26.jpg'
      },
      likes: 33,
      isLiked: false,
      comments: [
        {
          id: '8',
          userName: 'Jessica White',
          userAvatar: '/images/27.jpg',
          content: 'Amazing technique!',
          createdAt: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '9',
      title: 'Purple Lemonade',
      description: 'A playful take on digital fruit art.',
      imageUrl: '/images/28.png',
      author: {
        name: 'Lila Berry',
        avatar: '/images/29.png',
        verified: true
      },
      likes: 22,
      isLiked: false,
      comments: [],
      createdAt: new Date()
    },
    {
      id: '10',
      title: 'Neon Night',
      description: 'City lights and vibrant colors.',
      imageUrl: '/images/14.jpg',
      author: {
        name: 'Neon Fox',
        avatar: '/images/15.jpg',
        verified: false
      },
      likes: 31,
      isLiked: false,
      comments: [],
      createdAt: new Date()
    },
    {
      id: '11',
      title: 'Dreamscape',
      description: 'Surreal digital landscapes.',
      imageUrl: '/images/18.jpg',
      author: {
        name: 'Dreamy Dee',
        avatar: '/images/5.jpg',
        verified: true
      },
      likes: 44,
      isLiked: false,
      comments: [],
      createdAt: new Date()
    },
    {
      id: '12',
      title: 'Sunset Glow',
      description: 'Warmth and color at dusk.',
      imageUrl: '/images/8.jpg',
      author: {
        name: 'Sunny Ray',
        avatar: '/images/6.jpg',
        verified: false
      },
      likes: 19,
      isLiked: false,
      comments: [],
      createdAt: new Date()
    },
    {
      id: '14',
      title: 'Mystic Forest',
      description: 'A walk through a digital forest.',
      imageUrl: '/images/20.jpg',
      author: {
        name: 'Misty Woods',
        avatar: '/images/21.jpg',
        verified: false
      },
      likes: 36,
      isLiked: false,
      comments: [],
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setPosts(initialPosts);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <LoadingPage isLoading={isLoading} />
          <Header onCreateClick={() => setShowModal(true)} onSignInClick={() => setShowSignIn(true)} />
          <main>
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/explore" element={<Explore posts={posts} setPosts={setPosts} />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <footer className="site-footer">
            made by <a href="https://x.com/0xberayan" target="_blank" rel="noopener noreferrer">berayan</a>
          </footer>
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
          <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} onOpenSignUp={() => { setShowSignIn(false); setShowSignUp(true); }} />
          <SignUpModal open={showSignUp} onClose={() => setShowSignUp(false)} onOpenSignIn={() => { setShowSignUp(false); setShowSignIn(true); }} />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App; 