import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "1d3ad3a1e497c9afbe443d1443905c3f";
const LANGUAGE = "ko-KR";

const getQuery = (path, num = 1) => {
  let url = `${BASE_URL}${path}?api_key=${API_KEY}&language=${LANGUAGE}&page=${num}`;
  return url;
};
export default async function fetchData(path, num) {
  const url = getQuery(path, num);
  const result = await axios.get(url);
  return result;
}
