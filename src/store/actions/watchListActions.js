import API from '../../utils/api';
import {getSessionID} from './authActions'

export const watchLaterRequest = () => ({
  type: 'WATCHLIST_REQUEST'
});

export const removeWatchLaterFailure = (error) => ({
  type: 'REMOVE_WATCHLIST_FAILURE', error
});

export const getWatchLaterSuccess = (watchLists) => ({
  type: 'GET_WATCHLIST_SUCCESS', watchLists
});

export const getWatchLaterFailure = (error) => ({
  type: 'GET_WATCHLIST_FAILURE', error
});

//Watchlist API calls

//adds movie to watchlist
export function addToWatchList(payload) {
  return (_, getState) => {

    const session_id = getState().auth.session_id;
    
    API.addOrRemoveWatchlist(session_id, payload)
  }
}

//removes movie from watchlist
export function removeFromWatchList(payload) {
  return async(dispatch, getState) => {
    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
    
    API.addOrRemoveWatchlist(session_id, payload)
      .then( _ => {
        //move to the previous page when all results in a page is removed
        //this helps pagination
        const watchlistMovies = getState().watchlists.watchLists;
        if(watchlistMovies.page > 1 && watchlistMovies.results.length < 1){
          dispatch(getAllWatchLists(--watchlistMovies.page))
        }else{
          dispatch(getAllWatchLists(watchlistMovies.page))
        }
      })
      .catch(error => {
        dispatch(removeWatchLaterFailure(error.response))
      });
  }
}

//gets all watchlists
export function getAllWatchLists(page) {
  return async(dispatch, getState) => {

    dispatch(watchLaterRequest());

    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
    
    API.getAllWatchlist(session_id, page)
      .then(response => {
        dispatch(getWatchLaterSuccess(response.data))
      })
      .catch(error => {
        dispatch(getWatchLaterFailure(error))
      });
  }
}