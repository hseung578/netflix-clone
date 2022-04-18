const API_KEY = "a9bb50d3a70aa927c8941fe9d4482b24";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: [];
}

export interface IGetMoviesResults {
  date: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  genre_ids: [];
}

export interface IGetTvResults {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface IGenre {
  id: number;
  name: string;
}

export interface IGetGenre {
  genres: IGenre[];
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&region=kr`).then(
    (response) => response.json()
  );
}

export function getTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&region=kr`).then(
    (response) => response.json()
  );
}

export function getGenre() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

export function getRateMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getRateTvshows() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getAirTvshows() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getOnTheAirTvshows() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
