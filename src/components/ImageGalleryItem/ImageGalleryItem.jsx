import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, largeImage, toggleModal }) => {
  return (
    <li
      onClick={() => toggleModal(largeImage)}
      className={css.ImageGalleryItem}
    >
      <img className={css.ImageGalleryItemImage} src={url} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
