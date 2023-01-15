import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';
import imagesAPI from 'apiHelpers';

import css from './App.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App({ imageName }) {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(imageName)
      .then(images => {
        setImages(images);
        setStatus(Status.RESOLVED);
      })

      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName]);

  if (status === Status.IDLE) {
    return <div>Enter the name of the picture you are looking for</div>;
  }

  if (status === Status.PENDING) {
    return <ImageGalleryItem imageName={imageName} />;
  }
  if (status === Status.REJECTED) {
    return <ImageError message={'sorry image not found'} />;
  }
  if (status === Status.RESOLVED) {
    return <ImageGallery images={images} />;
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

  const selectedImage = (largeImageURL, imgTags) => {
    setLargeImageURL({ largeImageURL, imgTags });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={this.formSubmit} />
      {error && toast.error('sorry, try again')}
      {status === 'pending' && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {!imageName && <p className={css.looking}>What do you want to find? </p>}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} selectedImage={this.selectedImage} />
          {status === 'resolved' && <Button loadMore={this.loadMore} />}
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
