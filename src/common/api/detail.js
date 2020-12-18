import fetchData from "../util/fetchData";
import { EMPTY, YOUTUBE_PATH, THUMBNAIL_PATH } from "../../const";

const getDetailMovie = async (id) => {
  const response = await fetchData(id);
  const result = response.data;
  console.log("detail", result);
  let gens = "";
  const genreList = result.genres.map((genre) => genre.name);
  if (result.genres.length > 3) {
    genreList.splice(3);
  }
  gens = genreList.join(" / ");

  return {
    backdrop_path: `https://image.tmdb.org/t/p/original/${result.backdrop_path}`,
    id: result.id,
    title: result.title,
    tagline: result.tagline,
    overview: result.overview,
    poster_path: `//image.tmdb.org/t/p/original/${result.poster_path}`,
    gens,
    vote_average: result.vote_average,
    runtime: result.runtime,
  };
};
export const getCasts = async (id) => {
  const response = await fetchData(`${id}/credits`);
  const result = response.data.cast;
  let casts = result.map((cast) => {
    let profile_path = `//image.tmdb.org/t/p/w500/${cast.profile_path}`;
    if (cast.profile_path === null) {
      profile_path = EMPTY;
    }
    return {
      name: cast.name,
      character: cast.character,
      profile_path,
    };
  });
  if (casts.length > 5) {
    return casts.splice(0, 5);
  }
  return casts;
};

export const getVideos = async (id) => {
  const response = await fetchData(`${id}/videos`);
  const result = response.data.results;
  const youtube = result.filter((item) => item.site === "YouTube");
  let videos = youtube.map((video) => ({
    key: `${YOUTUBE_PATH}${video.key}`,
    thumbnail: `${THUMBNAIL_PATH}${video.key}/sddefault.jpg`,
  }));
  if (videos.length > 3) {
    return videos.splice(0, 3);
  }
  return videos;
};

export const getSimilars = async (id) => {
  const response = await fetchData(`${id}/similar`);
  const result = response.data.results;
  let similars = result.map((similar) => ({
    title: similar.title,
    poster_path: `//image.tmdb.org/t/p/w500/${similar.poster_path}`,
    id: similar.id,
  }));
  if (similars.length > 3) {
    return similars.splice(0, 3);
  }
  return similars;
};

export default async function detailApi(id) {
  const movieDetails = await getDetailMovie(id);
  const movieVideos = await getVideos(id);
  const movieCasts = await getCasts(id);
  const movieSimilars = await getSimilars(id);

  const movie = {};
  Object.assign(movie, movieDetails);
  movie.casts = movieCasts;
  movie.videos = movieVideos;
  movie.similars = movieSimilars;
  movie.id = id;

  return movie;
}
