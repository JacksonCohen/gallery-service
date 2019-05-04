import React from 'react';

const Slideshow = (props) => (
  <div className="slideshow-container">
    {props.listings.map((listing, i) => (
      <div key={i} className={listing.thumbnailWidth === 550 ? 'large-tile' : 'small-tile'}>
        <img
          onClick={e => props.openLightbox(i, e)}
          src={listing.src}
          width={listing.thumbnailWidth}
          height={listing.thumbnailHeight}
        />
      </div>
    ))}
  </div>
);

export default Slideshow;
