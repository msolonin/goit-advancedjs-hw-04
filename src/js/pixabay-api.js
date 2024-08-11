import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '45269069-80d5a565d51e24ea911778696';

export const fetchPhotos = (query, page, itemPerPage) => {
  const searchParams = {
    params: {
      q: query,
      key: API_KEY,
      page: page,
      per_page: itemPerPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get('/api/', searchParams);

};
