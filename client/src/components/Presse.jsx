import React from 'react';

const Presse = ({ photos }) => {
  return (
    <div>
      <h2>Photos de Presse</h2>
      <div className="photos-container">
        {photos.map((photo, index) => (
          <div key={index} className="photo-card">
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presse;
