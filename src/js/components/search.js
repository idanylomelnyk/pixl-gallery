import { getPhotosAndRender } from "./gallery";

const searchFormEl = document.querySelector(".search-form");

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target.elements.search.value.trim();

  if (!query) return;

  getPhotosAndRender(query);
});
