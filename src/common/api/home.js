import fetchData from "../util/fetchData";
import axios from "axios";
import { BASE_URL, API_KEY, LANGUAGE, IMG_PATH } from "../../const";

export default async function introApi() {
  let result = await axios
    .get(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`
    )
    .then((response) => response);
  result = result.data.results;
  let id = result[Math.floor(Math.random() * result.length)].id;

  const response = await fetchData(`${id}`);
  const introMovie = response.data;
  let randomMivie = {
    backdropPath: `${IMG_PATH}${introMovie.backdrop_path}`,
    title: introMovie.title,
    tagline: introMovie.tagline,
    id: introMovie.id,
    poster_path: `${IMG_PATH}${introMovie.poster_path}`,
  };

  return randomMivie;
}
