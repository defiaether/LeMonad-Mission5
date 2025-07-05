import React, { useState } from 'react';
import './PostCard.css';

interface Post {
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

interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  const getImageClass = () => {
    switch (post.imageFormat) {
      case '4:3':
        return 'post-image-4-3';
      case '16:9':
        return 'post-image-16-9';
      case '1:1':
        return 'post-image-1-1';
      default:
        return 'post-image-custom';
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <img 
            src={post.artistAvatar} 
            alt={post.artistName} 
            className="author-avatar"
          />
          <div className="author-info">
            <h3 className="author-name">{post.artistName}</h3>
            <span className="post-date">{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        
        <div className={`post-image-container ${getImageClass()}`}>
          <img 
            src={post.image} 
            alt={post.title}
            className="post-image"
          />
        </div>
      </div>

      <div className="post-actions">
        <button 
          className={`action-button like-button ${post.isLiked ? 'liked' : ''}`}
          onClick={() => onLike(post.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{post.likes}</span>
        </button>

        <button 
          className="action-button comment-button"
          onClick={() => setShowComments(!showComments)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleSubmitComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">
              Post
            </button>
          </form>

          <div className="comments-list">
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <img 
                  src={comment.userAvatar} 
                  alt={comment.userName} 
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userName}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard; 