import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '45269069-80d5a565d51e24ea911778696';

export const fetchPhotos = (query, page) => {
  // const searchParams = new URLSearchParams({
  //   q: query,
  //   key: API_KEY,
  //   page: page,
  //   per_page: 10,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: true,
  // });
  const searchParams = {
    params: {
      q: query,
      key: API_KEY,
      page: page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get('/api/', searchParams);

  // return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
  //   console.log(`https://pixabay.com/api/?${searchParams}`);
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
};
