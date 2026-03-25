import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

export async function fetchImagesFromPixabayAPI(query, page) {
  const response = await axios.get("", {
    params: {
      q: query,
      key: apiKey,
      image_type: "photo",
      safesearch: true,
      page,
      per_page: 24,
    },
  });

  return response.data;
}
