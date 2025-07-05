import React from 'react';
import { Carousel } from 'react-bootstrap';

const MediaCarousel = ({ media }) => {
  return (
    <Carousel interval={null}>
      {media.map((item, index) => {
        const isImage = item.type === 'image';
        return (
          <Carousel.Item key={index}>
            {isImage ? (
              <img
                className="d-block w-100"
                src={`${BASE_URL}/uploads/${item.path}`}
                alt={`Slide ${index}`}
              />
            ) : (
              <video className="d-block w-100" controls>
                <source src={`${BASE_URL}/uploads/${item.path}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default MediaCarousel;
