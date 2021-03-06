import axios from 'axios';

//get environmental viriables
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.REACT_APP_ACCESS_ACCOUNT_ID;

//set urls
const SEARCH_URL = (query, page) => `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
const FAVORITE_URL = (session_id) =>`${BASE_URL}account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
const FAVORITES_URL = (session_id, page) => `${BASE_URL}account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}&page=${page}`;
const WATCHLIST_URL = (session_id) => `${BASE_URL}account/${ACCOUNT_ID}/watchlist?api_key=${API_KEY}&session_id=${session_id}`;
const WATCHLISTS_URL = (session_id, page) => `${BASE_URL}account/${ACCOUNT_ID}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}&page=${page}`;
const MOVIE_DETAILS = (movieId) => `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
const SESSION_URL = `${BASE_URL}authentication/session/convert/4?api_key=${API_KEY}`;
const MOVIE_STATE = (session_id, movieId) => `${BASE_URL}movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${session_id}`;

const API = {
  search(title, page = 1) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title, page));
  },

  addOrRemoveFavourite(session_id, payload) {
    return axios.post(FAVORITE_URL(session_id), payload);
  },

  getAllFavourites(session_id, page = 1) {
    return axios.get(FAVORITES_URL(session_id, page));
  },

  addOrRemoveWatchlist(session_id, payload) {
    return axios.post(WATCHLIST_URL(session_id), payload);
  },

  getAllWatchlist(session_id, page = 1) {
    return axios.get(WATCHLISTS_URL(session_id, page));
  },

  createSession() {
    return axios.post(SESSION_URL,{access_token:ACCESS_TOKEN});
  },

  getMovieDetails(movieId) {
    return axios.get(MOVIE_DETAILS(movieId));
  },
  
  getMovieState(session_id, movieId) {
    return axios.get(MOVIE_STATE(session_id, movieId));
  }
}

window.API = API;
window.axios = axios;

export default API;