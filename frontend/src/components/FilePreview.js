import React from 'react';
import PropTypes from 'prop-types';

const FilePreview = ({ files = [], onRemove = () => {} }) => (
  <div className="file-preview">
    {files.map((file) => {
      const isImage = file.type?.startsWith('image/');
      const isVideo = file.type?.startsWith('video/');
      const uniqueKey = `${file.name}-${file.lastModified}-${file.size}`;
      
      return (
        <div key={uniqueKey} className="file-preview-item">
          {isImage && <img src={URL.createObjectURL(file)} alt="Preview" />}
          {isVideo && (
            <video controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              <track kind="captions" src="" label="English" />
            </video>
          )}
          <button 
            type="button" 
            onClick={() => onRemove(files.indexOf(file))} 
            className="remove-button"
            aria-label="Remove file"
          >
            X
          </button>
        </div>
      );
    })}
  </div>
);

FilePreview.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.number,
      lastModified: PropTypes.number,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilePreview;
