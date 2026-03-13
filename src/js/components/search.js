import { getPhotosAndRender } from "./gallery";

const searchFormEl = document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target.elements.search.value.trim();

  if (!query) return;

  galleryEl.innerHTML = "";
  getPhotosAndRender(query, 1);
});
