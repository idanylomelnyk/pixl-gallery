import { fetchImagesFromPixabayAPI } from "../api/pixabay";
import { showNotification } from "../utils/notifications";
import likeIcon from "../../assets/icons/heart.svg";
import downloadIcon from "../../assets/icons/download.svg";
import eyeIcon from "../../assets/icons/eye.svg";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");
const prevPageButtonEl = document.querySelector(
  ".pagination-list__button-prev",
);
const nextPageButtonEl = document.querySelector(
  ".pagination-list__button-next",
);
const paginationEl = document.querySelector(".pagination");
const currentPageEl = document.querySelector(".pagination-info__current-page");
const totalPageEl = document.querySelector(".pagination-info__total-page");

let currentQuery = "nature";
let currentPage = 1;

export async function getPhotosAndRender(query, page) {
  currentQuery = query;
  currentPage = page;

  try {
    loaderEl.classList.remove("loader-hidden");

    const data = await fetchImagesFromPixabayAPI(query, page);

    const totalPages = Math.ceil(data.totalHits / 24);

    prevPageButtonEl.disabled = currentPage < 2;
    nextPageButtonEl.disabled = totalPages === currentPage;

    currentPageEl.textContent = currentPage;
    totalPageEl.textContent = totalPages;

    if (!data.hits.length) {
      paginationEl.classList.add("hidden");
      showNotification(
        "Oops! No results for your search. Try searching for something else",
      );
      return;
    } else {
      paginationEl.classList.remove("hidden");
    }

    renderGallery(data.hits);
  } catch (error) {
    showNotification(error.message);
  } finally {
    loaderEl.classList.add("loader-hidden");
  }
}

function renderGallery(images) {
  galleryEl.innerHTML = "";

  const galleryMarkup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        imageWidth,
        imageHeight,
        tags,
        views,
        likes,
        downloads,
      }) =>
        `  <a href="${largeImageURL}" 
            data-pswp-width="${imageWidth}" 
            data-pswp-height="${imageHeight}">
            <img class="gallery__img" src="${webformatURL}" width="385" height="256" alt="${tags}" />
            ${createCaption({ views, likes, downloads, tags })}
          </a>`,
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);
}

getPhotosAndRender(currentQuery, currentPage);

prevPageButtonEl.addEventListener("click", () => {
  currentPage -= 1;

  window.scrollTo(0, 0);

  getPhotosAndRender(currentQuery, currentPage);
});

nextPageButtonEl.addEventListener("click", () => {
  currentPage += 1;

  window.scrollTo(0, 0);

  getPhotosAndRender(currentQuery, currentPage);
});

function createCaption({ views, likes, downloads, tags }) {
  return `
    <div class="pswp-caption-content">
      <ul class="image-info">
        <li class="image-info__item">
          <img class="image-info__icon" src="${eyeIcon}" alt="Views" />${views.toLocaleString()}
        </li>
        <li class="image-info__item">
          <img
            class="image-info__icon"
            src="${downloadIcon}"
            alt="Downloads"
          />${downloads.toLocaleString()}
        </li>
        <li class="image-info__item">
          <img class="image-info__icon" src="${likeIcon}" alt="Likes" />${likes.toLocaleString()}
        </li>
      </ul>
      <p class="image-tags">Tags: ${tags}</p>
    </div>`;
}
