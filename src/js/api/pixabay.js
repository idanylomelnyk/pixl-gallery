import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

export async function fetchImagesFromPixabayAPI(query) {
  const response = await axios.get("", {
    params: {
      q: query,
      key: apiKey,
      image_type: "photo",
      safesearch: true,
      per_page: 21,
    },
  });

  return response.data.hits;
}
