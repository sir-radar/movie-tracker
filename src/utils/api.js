import axios from 'axios';
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const SEARCH_URL = (query) => `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`;
const FAVORITE_URL = (account_id, session_id) =>`${BASE_URL}account/${account_id}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
const FAVORITES_URL = (account_id,session_id ) => `${BASE_URL}account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}`;
const WATCHLIST_URL = (account_id,session_id ) => `${BASE_URL}account/${account_id}/watchlist?api_key=${API_KEY}&session_id=${session_id}`;
const WATCHLISTS_URL = (account_id,session_id ) => `${BASE_URL}account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}`;
const SESSION_URL = `${BASE_URL}authentication/session/convert/4?api_key=${API_KEY}`;
const ACCOUNT_URL = (session_id) => `${BASE_URL}account?api_key=${API_KEY}&session_id=${session_id}`;

const apiClient = {
  search(title) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title));
  },

  addToFavorite(account_id, session_id, payload) {
    return axios.post(FAVORITE_URL(account_id, session_id), payload);
  },

  getAllFavorites(account_id, session_id) {
    return axios.get(FAVORITES_URL(account_id, session_id));
  },

  addToWatchlist(account_id, session_id, payload) {
    return axios.post(WATCHLIST_URL(account_id, session_id), payload);
  },

  getAllWatchlist(account_id, session_id) {
    return axios.get(WATCHLISTS_URL(account_id, session_id));
  },

  createSession() {
    return axios.post(SESSION_URL,{ACCESS_TOKEN});
  },

  getAccountDetails(session_id) {
    return axios.get(ACCOUNT_URL(session_id));
  }
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;