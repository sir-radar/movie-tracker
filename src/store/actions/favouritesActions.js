import API from '../../utils/api';

export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

export const removeFavoriteSuccess = (favorite) => ({
  type: 'REMOVE_FAVORITE_SUCCESS', favorite
});

export const removeFavoriteFailure = (favorite) => ({
  type: 'REMOVE_FAVORITE_FAILURE', favorite
});

export const getFavoritesSuccess = (favorites) => ({
  type: 'GET_FAVORITES_SUCCESS', favorites
});

export const getFavoritesFailure = (error) => ({
  type: 'GET_FAVORITES_FAILURE', error
});

//Favourite API calls

//adds movie to favourites list
export function addToFavorite(payload) {
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;
    
    API.addToFavorite(session_id, payload)
      .then( _ => {
        dispatch(saveFavoriteSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(saveFavoriteFailure(error.response.data))
      });
  }
}

//removes movie from favourites list
export function removeFromFavorite(payload) {
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;
    
    API.addToFavorite(session_id, payload)
      .then( _ => {
        dispatch(removeFavoriteSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(removeFavoriteFailure(error.response.data))
      });
  }
}

//gets all favourite movies
export function getAllFavorites() {
  return (dispatch, getState) => {

    const session_id = getState().auth.session_id;
    
    API.getAllFavorites(session_id)
      .then(response => {
        dispatch(getFavoritesSuccess(response.data))
      })
      .catch(error => {
        dispatch(getFavoritesFailure(error.response.data))
      });
  }
}