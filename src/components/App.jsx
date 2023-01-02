import React, { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import css from './App.module.css';
import Loader from './Loader';
import fetchImages from 'apiHelpers';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    error: null,
    largeImageURL: '',
    imgTags: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ loading: true, status: 'pending' });

        await fetchImages(imageName, page).then(images => {
          if (images.length === 0) {
            this.setState(prevState => (prevState.images = []));

            toast.error(`no picture with name ${imageName}`, {
              icon: '🥺',
            });
            return;
          }
          this.setState({
            images: [...this.state.images, ...images],
            status: 'resolved',
          });
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('we can not find');
      } finally {
        this.setState({ loading: false });
      }
    }
    if (prevState.page !== page) {
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleSelectedImage = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags });
  };
  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { imageName, loading, images, error, largeImageURL, imgTags } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error('sorry, try again')}
        {loading && (
          <div className={css.loading}>
            <Loader
              height="70"
              width="50"
              radius="20"
              color="blue"
              ariaLabel="loading"
              wrapperStyle
            />
          </div>
        )}

        {!imageName && (
          <p className={css.looking}>What are you looking for? </p>
        )}
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              handleSelectedImage={this.handleSelectedImage}
            />
            <button
              className={css.buttonMain}
              type="button"
              onClick={this.handleLoadMore}
            >
              Learn more
            </button>
          </>
        )}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            imgTags={imgTags}
            onClose={this.closeModal}
          >
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
        <Toaster />
      </div>
    );
  }
}
