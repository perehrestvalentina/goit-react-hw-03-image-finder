import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { getGalleryService } from '../../apiHelpers';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query && this.props.query !== '') {
      this.setState({ isLoading: true });
      const data = await getGalleryService(this.props.query);
      this.setState({
        images: data.hits,
        page: 1,
        isLoading: false,
      });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ isLoading: true });
      const data = await getGalleryService(this.props.query, this.state.page);

      this.setState(prev => ({
        images: [...prev.images, ...data.hits],
        isLoadind: false,
      }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}
        <ul className={css.ImageGallery}>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              toggleModal={this.props.toggleModal}
              url={image.webformatURL}
              largeImage={image.largeImageURL}
            />
          ))}
        </ul>
        <Button loadMore={this.loadMore} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
  toggleModal: PropTypes.func,
};
export default ImageGallery;
