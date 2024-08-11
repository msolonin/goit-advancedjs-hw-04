import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const izitoastPosition = 'topRight';
let currentPage = 1;
let searchedValue = '';

let lightbox =  new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        })

// const renderPosts = async () => {
//   try {
//     const { data } = await fetchPhotos(searchedValue, currentPage);
//     const { hits } = data;
//     const galleryCardsTemplate = hits
//       .map(imgInfo => createGalleryCardTemplate(imgInfo))
//       .join('');
//     galleryEl.innerHTML = galleryCardsTemplate;
//     loadMoreBtnEl.classList.remove('is-hidden');
//   } catch (err) {
//     console.log(err);
//   }
// };

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    const { data } = await fetchPhotos(searchedValue, currentPage);
    const { hits } = data;
    if (data.length === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
    iziToast.error({
      message: 'Постів більше не знайдено!',
      position: izitoastPosition,
    });
      return;
    }

    const postCardsTemplate = hits
      .map(imgInfo => createGalleryCardTemplate(imgInfo))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', postCardsTemplate);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
};

const onSearchFormSubmit = event => {
  event.preventDefault();

  searchedValue = event.target.elements.user_query.value.trim();
  loadMoreBtnEl.classList.add('is-hidden');
  if (searchedValue === '') {
    iziToast.error({
      message: 'Поле для пошуку не має бути порожнім!',
      position: izitoastPosition,
    });

    searchFormEl.reset();
    return;
  }

  loaderEl.classList.remove('is-hidden');

  fetchPhotos(searchedValue, currentPage)
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    })
    .then(({ data }) => {
      const { hits } = data;
      if (hits.length === 0) {
        iziToast.error({
          message: 'За вашим запитом, зображень не знайдено!',
          position: 'topRight',
        });

        searchFormEl.reset();
        galleryEl.innerHTML = '';

        return;
      }
      const galleryCardsTemplate = hits
        .map(imgInfo => createGalleryCardTemplate(imgInfo))
        .join('');

      galleryEl.innerHTML = galleryCardsTemplate;
      lightbox.refresh();
    loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);