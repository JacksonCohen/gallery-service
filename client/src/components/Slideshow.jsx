import React from 'react';

const Slideshow = (props) => {
  const { listings, openLightbox } = props;

  return (
    <div className="slideshow-container">
      {listings.map(({ thumbnailWidth, thumbnailHeight, src}, i) => (
        <div key={i} className={thumbnailWidth === 550 ? 'large-tile' : 'small-tile'}>
          <img
            onClick={e => openLightbox(i, e)}
            src={src}
            width={thumbnailWidth}
            height={thumbnailHeight}
          />
        </div>
      ))}
    </div>
  );
}

export default Slideshow;
