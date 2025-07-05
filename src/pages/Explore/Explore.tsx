import React from 'react';
import './Explore.css';
import PostCard from '../../components/explore/PostCard';
import Header from '../../components/common/Header';
import { Post } from '../../App';

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
    <div className="explore-page">
      <div className="explore-container">
        <Header />
        <div className="explore-header">
          <h1>Explore</h1>
          <p>Discover amazing artwork from talented artists</p>
        </div>
        <div className="explore-content">
          <div className="feed-section">
            <div className="posts-feed">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))}
            </div>
          </div>
          <div className="sidebar">
            <div className="trending-section">
              <h3>Trending Artists</h3>
              <div className="trending-artists">
                <div className="trending-artist">
                  <img src="/mock/artist1.jpg" alt="Artist" />
                  <div>
                    <h4>Sarah Chen</h4>
                    <p>Digital Artist</p>
                  </div>
                </div>
                <div className="trending-artist">
                  <img src="/mock/artist2.jpg" alt="Artist" />
                  <div>
                    <h4>Marcus Rodriguez</h4>
                    <p>Photographer</p>
                  </div>
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