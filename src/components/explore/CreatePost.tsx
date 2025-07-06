import React, { useState, useRef } from 'react';
import './CreatePost.css';
import { Post } from '../../App';

interface CreatePostProps {
  onCreatePost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked'>) => void;
  formRef?: React.RefObject<HTMLFormElement>;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost, formRef }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageUrl) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked'> = {
        title: title.trim(),
        description: description.trim(),
        imageUrl,
        author: {
          name: 'Current User',
          avatar: '/mock/artist1.jpg'
        },
        createdAt: new Date()
      };

      onCreatePost(newPost);
      
      // Reset form
      setTitle('');
      setDescription('');
      setImageUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const removeImage = () => {
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="create-post">
      {/* Removed header and subheading for more space */}
      <form ref={formRef} onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title..."
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your artwork..."
            required
            maxLength={500}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <div className="image-upload-area compact-uploader">
            {imageUrl ? (
              <div className="image-preview">
                <img src={imageUrl} alt="Preview" />
                <button type="button" onClick={removeImage} className="remove-image-cross" title="Remove image">&times;</button>
              </div>
            ) : (
              <label htmlFor="image-upload-input" className="upload-icon-label" title="Upload image">
                <input
                  ref={fileInputRef}
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <span className="upload-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="form-actions">
        </div>
      </form>
    </div>
  );
};

export default CreatePost; 