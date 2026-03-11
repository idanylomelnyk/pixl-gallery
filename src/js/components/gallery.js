import { fetchImagesFromPixabayAPI } from "../api/pixabay";
import { showNotification } from "../utils/notifications";

const galleryEl = document.querySelector(".gallery");

export async function getPhotosAndRender(query) {
  try {
    const data = await fetchImagesFromPixabayAPI(query);

    if (!data.length) {
      return showNotification(
        "Oops! No results for your search. Try searching for something else",
      );
    }
    renderGallery(data);
  } catch (error) {
    showNotification(error.message);
  }
}

function renderGallery(images) {
  galleryEl.innerHTML = "";

  const galleryMarkup = images
    .map(
      ({ largeImageURL, webformatURL, imageWidth, imageHeight, tags }) =>
        `  <a href="${largeImageURL}" 
            data-pswp-width="${imageWidth}" 
            data-pswp-height="${imageHeight}">
            <img src="${webformatURL}" alt="${tags}" />
            <span class="pswp-caption-content">Caption content</span>
          </a>`,
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);
}

getPhotosAndRender("nature");
