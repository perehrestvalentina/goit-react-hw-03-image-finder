import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from 'apiHelpers';

import css from './App.module.css';

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

            toast.error(
              `no picture with name ${imageName}, check what you enter`
            );
            return;
          }
          this.setState({
            images: [...this.state.images, ...images],
            status: 'resolved',
          });
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('sorry image not found');
      } finally {
        this.setState({ loading: false });
      }
    }
    if (prevState.page !== page) {
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };
  formSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  selectedImage = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags });
  };

  render() {
    const { imageName, loading, images, error, largeImageURL, imgTags } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.formSubmit} />
        {error && toast.error('sorry, try again')}
        {loading && (
          <div className={css.loading}>
            <Loader
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}

        {!imageName && (
          <p className={css.looking}>What do you want to find? </p>
        )}
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              handleSelectedImage={this.selectedImage}
            />
            <button
              className={css.buttonMain}
              type="button"
              onClick={this.loadMore}
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
