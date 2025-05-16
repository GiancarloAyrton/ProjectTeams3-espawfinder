import React from 'react';

const FilePreview = ({ files, onRemove }) => (
    <div className="file-preview">
      {files.map((file, index) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        return (
          <div key={index} className="file-preview-item">
            {isImage && <img src={URL.createObjectURL(file)} alt="Preview" />}
            {isVideo && <video src={URL.createObjectURL(file)} controls />}
            <button type="button" onClick={() => onRemove(index)} className="remove-button">X</button>
          </div>
        );
      })}
    </div>
  );

export default FilePreview;
