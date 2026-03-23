import { fetchImagesFromPixabayAPI } from "../api/pixabay";
import { showNotification } from "../utils/notifications";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");
const loadMoreButtonEl = document.querySelector(".load-more");
let currentQuery = "nature";
let currentPage = 1;

export async function getPhotosAndRender(query, page) {
  currentQuery = query;
  currentPage = page;

  try {
    loaderEl.classList.remove("loader-hidden");

    const data = await fetchImagesFromPixabayAPI(query, page);

    const totalPages = Math.ceil(data.totalHits / 21);

    if (currentPage < totalPages) {
      loadMoreButtonEl.classList.remove("load-more-hidden");
    } else {
      loadMoreButtonEl.classList.add("load-more-hidden");
    }

    if (!data.hits.length) {
      loadMoreButtonEl.classList.add("load-more-hidden");
      return showNotification(
        "Oops! No results for your search. Try searching for something else",
      );
    }
    renderGallery(data.hits);
  } catch (error) {
    showNotification(error.message);
  } finally {
    loaderEl.classList.add("loader-hidden");
  }
}

function renderGallery(images) {
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

getPhotosAndRender(currentQuery, currentPage);

loadMoreButtonEl.addEventListener("click", () => {
  currentPage += 1;

  getPhotosAndRender(currentQuery, currentPage);
});
