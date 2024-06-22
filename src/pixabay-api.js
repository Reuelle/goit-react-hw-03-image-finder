import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42882343-4100e0711ccee762d89ae20bd';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const response = await axios.get(url);
    console.log('API response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('API fetch error:', error); 
    throw error;
  }
};
