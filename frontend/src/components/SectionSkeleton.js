import React from 'react';
import '../css/SectionSkeleton.css';

const SectionSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-heading">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
      </div>
      
      <div className="skeleton-gallery">
        {Array(4).fill().map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-image"></div>
            <div className="skeleton-body">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSkeleton;
