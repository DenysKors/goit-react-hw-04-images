import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ responseData, getImageData }) {
  return responseData.map(({ id, webformatURL, largeImageURL, tags }) => (
    <GalleryItem key={id}>
      <GalleryImage
        onClick={evt => getImageData(largeImageURL, evt.target.alt)}
        src={webformatURL}
        alt={tags}
      />
    </GalleryItem>
  ));
}

ImageGalleryItem.propTypes = {
  responseData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  getImageData: PropTypes.func.isRequired,
};
