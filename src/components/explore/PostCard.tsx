import React, { useState } from 'react';
import './PostCard.css';
import { Post } from '../../App';

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

  return (
    <div className="post-frame">
      <div className="post-card-minimal">
        <div className="post-author-minimal">
          {post.author.verified ? (
            <div className="avatar-glow-wrapper">
              <img 
                src={post.author.avatar} 
                alt="" 
                className="author-avatar-minimal"
              />
            </div>
          ) : (
            <img 
              src={post.author.avatar} 
              alt="" 
              className="author-avatar-minimal"
            />
          )}
          <span className="author-name-minimal">{post.author.name}
            {post.author.verified && (
              <img src="/images/verified-badge.png" alt="Verified" className="verified-badge-img" />
            )}
          </span>
        </div>
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="post-image-minimal"
        />
      </div>
    </div>
  );
};

export default PostCard; 