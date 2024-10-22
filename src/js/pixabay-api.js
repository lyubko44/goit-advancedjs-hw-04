import axios from 'axios';

const apiKey = '46523265-c71f09449dcc8bc0189ac0d2d';

async function fetchImages(searchParam, perPage = 15, page = 1) {
  const params = new URLSearchParams({
    key: apiKey,
    q: searchParam,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  return response.data;
}

export default fetchImages;