import React from 'react';
import './Explore.css';
import PostCard from '../../components/explore/PostCard';
import Header from '../../components/common/Header';
import { Post } from '../../App';
import Aurora from '../../components/common/Aurora';

interface ExploreProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Explore: React.FC<ExploreProps> = ({ posts, setPosts }) => {
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, comment: string) => {
    const newComment = {
      id: Date.now().toString(),
      userName: 'CurrentUser',
      userAvatar: '/mock/artist1.jpg',
      content: comment,
      createdAt: new Date()
    };
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <Aurora
        colorStops={["#200052", "#836EF9", "#200052"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="explore-page">
          <div className="explore-container">
            <div className="explore-header">
              <h1>Explore</h1>
            </div>
            <div className="explore-content">
              <div className="feed-section">
                <div className="posts-feed">
                  {posts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                      <PostCard
                        post={post}
                        onLike={handleLike}
                        onComment={handleComment}
                      />
                      {idx < posts.length - 1 && <hr className="post-divider" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore; 