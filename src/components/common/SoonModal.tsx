import React from 'react';
import './SoonModal.css';

interface SoonModalProps {
  open: boolean;
  onClose: () => void;
}

const SoonModal: React.FC<SoonModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="soon-modal-overlay" onClick={onClose}>
      <div className="soon-modal-glass" onClick={e => e.stopPropagation()}>
        <span className="soon-modal-text">SOON :)</span>
      </div>
    </div>
  );
};

export default SoonModal; 