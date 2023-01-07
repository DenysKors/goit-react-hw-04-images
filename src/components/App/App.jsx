import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'components/Api/imageApi';
import { LoadButton } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Box } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [query, setQuery] = useState('');
  const [responseData, setResponceData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (query === '' || page !== 1) {
      return;
    }

    async function getImagesList() {
      try {
        const data = await fetchImages(query, page);
        if (data.hits.length === 0) {
          toast.info('Sorry, we cant find anything');
        }
        setResponceData(data.hits);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getImagesList();
  }, [query, page]);

  useEffect(() => {
    if (query === '' || page === 1) {
      return;
    }

    setLoading(true);

    async function addImagesList() {
      try {
        const data = await fetchImages(query, page);
        setResponceData(prevResponceData => [
          ...prevResponceData,
          ...data.hits,
        ]);
      } catch (error) {
        toast.warn('Something weird happend. Please try your request again');
      } finally {
        setLoading(false);
      }
    }
    addImagesList();
  }, [query, page]);

  const searchQuery = formQuery => {
    const normalizedQuery = formQuery.toLowerCase().trim();
    setQuery(normalizedQuery);
    setResponceData([]);
    setPage(1);
    setLoading(true);
  };

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getImageData = (imageUrl, imageTags) => {
    setUrl(imageUrl);
    setTags(imageTags);
    openModal();
  };

  return (
    <Box>
      <Searchbar onSubmit={searchQuery} />
      {responseData.length > 0 && (
        <ImageGallery responseData={responseData} getImageData={getImageData} />
      )}
      {loading && (
        <Puff wrapperStyle={{ display: 'inline-block', textAlign: 'center' }} />
      )}
      {responseData.length > 0 && <LoadButton onBtnClick={handleLoad} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>{<img src={url} alt={tags} />}</Modal>
      )}
      <ToastContainer position="top-left" theme="dark" autoClose={3000} />
    </Box>
  );
}
