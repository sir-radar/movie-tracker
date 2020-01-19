import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.REACT_APP_ACCESS_ACCOUNT_ID;

const SEARCH_URL = (query) => `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`;
const FAVORITE_URL = (session_id) =>`${BASE_URL}account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
const FAVORITES_URL = (session_id ) => `${BASE_URL}account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}`;
const WATCHLIST_URL = (session_id ) => `${BASE_URL}account/${ACCOUNT_ID}/watchlist?api_key=${API_KEY}&session_id=${session_id}`;
const WATCHLISTS_URL = (session_id ) => `${BASE_URL}account/${ACCOUNT_ID}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}`;
const SESSION_URL = `${BASE_URL}authentication/session/convert/4?api_key=${API_KEY}`;
const ACCOUNT_URL = (session_id) => `${BASE_URL}account?api_key=${API_KEY}&session_id=${session_id}`;

const API = {
  search(title) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title));
  },

  addToFavorite(session_id, payload) {
    return axios.post(FAVORITE_URL(session_id), payload);
  },

  getAllFavorites(session_id) {
    return axios.get(FAVORITES_URL(session_id));
  },

  addToWatchlist(session_id, payload) {
    return axios.post(WATCHLIST_URL(session_id), payload);
  },

  getAllWatchlist(session_id) {
    return axios.get(WATCHLISTS_URL(session_id));
  },

  createSession() {
    return axios.post(SESSION_URL,{access_token:ACCESS_TOKEN});
  },

  getAccountDetails(session_id) {
    return axios.get(ACCOUNT_URL(session_id));
  }
}

window.API = API;
window.axios = axios;

export default API;