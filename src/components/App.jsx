import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import SearchBar from './SearchBar/SearchBar';
import { getAPI } from 'pixabay-api';
import Button from './Button/Button';
import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isError: false,
    isEnd: false,
    // showModal: false,
    // selectedImage: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true, isError: false });
    const { searchQuery, currentPage } = this.state;
    try {
      const response = await getAPI(searchQuery, currentPage);
      console.log('Fetched images:', response.hits);
      const { totalHits, hits } = response;
      this.setState(prevState => ({
        images: currentPage === 1 ? hits : [...prevState.images, ...hits],
        isLoading: false,
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));
      if (hits.length === 0) {
        alert('No images found. Try a different search.');
        return;
      }
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
      alert(`An error occurred while fetching data: ${error}`);
    }
  };

  handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
      alert('Empty string is not a valid search query. Please type again.');
      return;
    }

    if (normalizedQuery === this.state.searchQuery) {
      alert('Search query is the same as the previous one. Please provide a new search query.');
      return;
    }

    console.log('Search query submitted:', normalizedQuery);
    this.setState({
      searchQuery: normalizedQuery,
      currentPage: 1,
      images: [],
      isEnd: false,
    });
  };

  handleLoadMore = () => {
    if (!this.state.isEnd) {
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    } else {
      alert("You've reached the end of the search results.");
    }
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading && !isError && images.length > 0 && !isEnd && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isError && <p>Something went wrong. Please try again later.</p>}
      </div>
    );
  }
}

export default App;
