import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import { renderLoading, renderImages, renderError} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simpleGallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captions: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'attr',
  captionsData: 'alt',
});

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;

  const searchParam = form.elements.search.value.trim();
  if (!searchParam) {
    return;
  }

  form.reset();

  renderLoading();

  fetchImages(searchParam, 1)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.total === 0) {
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again!'
          )
        );
      } else {
        renderImages(data.hits);
      }
    })
    .then(() => {
      simpleGallery.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
      renderError();
    });
});