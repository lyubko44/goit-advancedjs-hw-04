const apiKey = '46523265-c71f09449dcc8bc0189ac0d2d';

const fetchImages = (searchParam, page) => {
  return fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${searchParam}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
};

export default fetchImages;