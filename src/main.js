import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const itemPerPage = 100;
const izitoastPosition = 'topRight';
let commonTotalHits = 0;
let currentPage = 1;
let searchedValue = '';

let lightbox =  new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        })

const galleryCardHeight = () => {
  const galleryCard = document.querySelector('.gallery-img');
  if (galleryCard) {
    return galleryCard.getBoundingClientRect().height;
  }
  return 0;
}


const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    const { data } = await fetchPhotos(searchedValue, currentPage, itemPerPage);
    const { hits } = data;
    commonTotalHits = data.totalHits;
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
    const cardHeight = galleryCardHeight();
    window.scrollBy({top: cardHeight * 2, behavior: 'smooth' });
    if (commonTotalHits > 0 && commonTotalHits <= itemPerPage * currentPage) {
      iziToast.error({
        message: 'Ми шкодуемо але всі пости закінчилися!',
        position: izitoastPosition,
      });
    loadMoreBtnEl.classList.add('is-hidden');
    return;
    }
  } catch (err) {
      iziToast.error({
      message: err,
      position: izitoastPosition,
    });
  }
};

const onSearchFormSubmit = async event => {
    try {
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
        currentPage = 1;
        const { data } = await fetchPhotos(searchedValue, currentPage, itemPerPage);
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

        loaderEl.classList.add('is-hidden');
    } catch (err) {
        iziToast.error({
        message: err,
        position: izitoastPosition,
      });
    }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);