import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ responseData, getImageData }) => {
  return (
    <Gallery>
      <ImageGalleryItem
        responseData={responseData}
        getImageData={getImageData}
      />
    </Gallery>
  );
};

ImageGallery.propTypes = {
  responseData: PropTypes.array.isRequired,
  getImageData: PropTypes.func.isRequired,
};
