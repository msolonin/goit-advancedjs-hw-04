
export const createGalleryCardTemplate = pictureInfo => {
  return `
  <li class="gallery-card">
    <a class="gallery-link" href="${pictureInfo.largeImageURL}">
      <img
        class="gallery-img"
        src="${pictureInfo.webformatURL}"
        alt="${pictureInfo.tags}"
        />
    </a>
<div class="gallery-info">
    <div class="info-item">
      <strong>Likes</strong>
      <span>${pictureInfo.likes}</span>
    </div>
    <div class="info-item">
      <strong>Views</strong>
      <span>${pictureInfo.views}</span>
    </div>
    <div class="info-item">
      <strong>Comments</strong>
      <span>${pictureInfo.comments}</span>
    </div>
    <div class="info-item">
      <strong>Downloads</strong>
      <span>${pictureInfo.downloads}</span>
    </div>
  </div>
  </li>
  `;
};
