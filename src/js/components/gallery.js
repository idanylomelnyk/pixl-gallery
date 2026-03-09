import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { fetchImagesFromPixabayAPI } from "../api/pixabay";

const galleryEl = document.querySelector(".gallery");

function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "tomato",
    },
  }).showToast();
}

async function getPhotosAndRender() {
  try {
    const data = await fetchImagesFromPixabayAPI();
    renderGallery(data);
  } catch (error) {
    showError(error.message);
  }
}

function renderGallery(images) {
  const galleryMarkup = images
    .map(
      ({ largeImageURL, webformatURL, tags }) =>
        `<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"></a>`,
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);
}

getPhotosAndRender();
