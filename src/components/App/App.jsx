import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    responseData: [],
    page: 1,
    loading: false,
    isModalOpen: false,
    url: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImagesList();
    } else if (
      prevState.page !== this.state.page &&
      prevState.query === this.state.query
    ) {
      this.addImagesList();
    }
  }

  getImagesList = async () => {
    try {
      const data = await fetchImages(this.state.query, this.state.page);
      if (data.hits.length === 0) {
        toast.info('Sorry, we cant find anything');
      }
      this.setState({ responseData: data.hits });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  addImagesList = async () => {
    try {
      this.setState({ loading: true });
      const data = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        responseData: [...this.state.responseData, ...data.hits],
      }));
    } catch (error) {
      toast.warn('Something weird happend. Please try your request again');
    } finally {
      this.setState({ loading: false });
    }
  };

  searchQuery = query => {
    const normalizedQuery = query.toLowerCase().trim();
    this.setState({
      query: normalizedQuery,
      responseData: [],
      page: 1,
      loading: true,
    });
  };

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  getImageData = (url, tags) => {
    this.setState({ url, tags });
    this.openModal();
  };

  render() {
    const { responseData, loading, isModalOpen, url, tags } = this.state;
    return (
      <Box>
        <Searchbar onSubmit={this.searchQuery} />
        {responseData.length > 0 && (
          <ImageGallery
            responseData={responseData}
            getImageData={this.getImageData}
          />
        )}
        {loading && (
          <Puff
            wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
          />
        )}
        {responseData.length > 0 && <LoadButton onBtnClick={this.handleLoad} />}
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            {<img src={url} alt={tags} />}
          </Modal>
        )}
        <ToastContainer position="top-left" theme="dark" autoClose={3000} />
      </Box>
    );
  }
}
