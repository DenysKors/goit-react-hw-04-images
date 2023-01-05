import axios from 'axios';

const KEY = '31271672-bfb0d2ac7c61ea0216be79fb4';

export const fetchImages = async (query, page) => {
  const responceQuery = await axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return responceQuery.data;
};
