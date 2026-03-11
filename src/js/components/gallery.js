import { fetchImagesFromPixabayAPI } from "../api/pixabay";
import { showNotification } from "../utils/notifications";

const galleryEl = document.querySelector(".gallery");

async function getPhotosAndRender() {
  try {
    const data = await fetchImagesFromPixabayAPI();
    renderGallery(data);
  } catch (error) {
    showNotification(error.message);
  }
}

function renderGallery(images) {
  const galleryMarkup = images
    .map(
      ({ largeImageURL, webformatURL, imageWidth, imageHeight, tags }) =>
        `  <a href="${largeImageURL}" 
            data-pswp-width="${imageWidth}" 
            data-pswp-height="${imageHeight}"
            target="_blank">
            <img src="${webformatURL}" alt="${tags}" />
            <span class="pswp-caption-content">Caption content</span>
          </a>`,
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);
}

getPhotosAndRender();
