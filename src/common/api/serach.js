import axios from "axios";
import { SEARCH_URL, API_KEY, LANGUAGE } from "../../const";

const getSearchMovie = async (query) => {
  const url = `${SEARCH_URL}?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}&include_adult=false`;
  const result = await axios.get(url);
  return result;
};
export default getSearchMovie;
