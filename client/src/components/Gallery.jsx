import React, { Component } from 'react';
import axios from 'axios';
import NavBarOne from './NavBarOne.jsx';
import Slideshow from './Slideshow.jsx';
import Lightbox from 'react-images';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      path: window.location.pathname.substring(1)
    };

    this.goToNext = this.goToNext.bind(this);
    this.goToImage = this.goToImage.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  componentDidMount() {
    const { path } = this.state;
    axios
      // .get(`http://52.15.74.162:3010/api/${path}`)
      .get(`http://localhost:3010/api/${path}`)
      .then(({ data }) => {
        return Object.entries(data[0])
          .filter(listing => listing[0] !== 'id' && listing[0] !== '_id')
          .map(([type, url]) => {
            if (type === 'exterior') {
              return {
                src: url,
                thumbnail: url,
                thumbnailWidth: 550,
                thumbnailHeight: 416,
                caption: '$805,000 (2 beds, 2 baths, 989 sqft)'
              };
            } else {
              return {
                src: url,
                thumbnail: url,
                thumbnailWidth: 278,
                thumbnailHeight: 206,
                caption: '$805,000 (2 beds, 2 baths, 989 sqft)'
              };
            }
          });
      })
      .then(formattedListings => {
        this.setState({ listings: formattedListings });
      });
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  goToPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  goToNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  goToImage(index) {
    this.setState({
      currentImage: index
    });
  }

  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;
    this.gotoNext();
  }

  render() {
    const { listings, currentImage, lightboxIsOpen } = this.state;
    const { preventScroll, showThumbnails, spinner, spinnerColor, spinnerSize, theme } = this.props;

    return (
      <>
        <div className="navbar-container">
          <NavBarOne />
        </div>
        <Slideshow listings={listings} openLightbox={this.openLightbox} />
        <Lightbox
          images={listings}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.goToNext}
          onClickPrev={this.goToPrevious}
          onClickThumbnail={this.goToImage}
          onClose={this.closeLightbox}
          preventScroll={preventScroll}
          showThumbnails={showThumbnails}
          spinner={spinner}
          spinnerColor={spinnerColor}
          spinnerSize={spinnerSize}
          theme={theme}
        />
      </>
    );
  }
}

export default Gallery;
