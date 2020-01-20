import API from '../../utils/api';

export const watchLaterRequest = () => ({
  type: 'WATCHLIST_REQUEST'
});

export const saveWatchLaterSuccess = (watchList) => ({
  type: 'SAVE_WATCHLIST_SUCCESS', watchList
});

export const saveWatchLaterFailure = (error) => ({
  type: 'SAVE_WATCHLIST_FAILURE', error
});

export const removeWatchLaterSuccess = (watchList) => ({
  type: 'REMOVE_WATCHLIST_SUCCESS', watchList
});

export const removeWatchLaterFailure = (watchList) => ({
  type: 'REMOVE_WATCHLIST_FAILURE', watchList
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
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;
    
    API.addToWatchlist(session_id, payload)
      .then( _ => {
        dispatch(saveWatchLaterSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(saveWatchLaterFailure(error.response.data))
      });
  }
}

//removes movie from watchlist
export function removeFromWatchList(payload) {
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;
    
    API.addToWatchlist(session_id, payload)
      .then( _ => {
        dispatch(removeWatchLaterSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(removeWatchLaterFailure(error.response.data))
      });
  }
}

//gets all watchlists
export function getAllWatchLists() {
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;

    dispatch(watchLaterRequest());
    
    API.getAllWatchlist(session_id)
      .then(response => {
        dispatch(getWatchLaterSuccess(response.data))
      })
      .catch(error => {
        dispatch(getWatchLaterFailure(error.response.data))
      });
  }
}