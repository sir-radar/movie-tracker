import API from '../../utils/api';
import {getSessionID} from './authActions'

export const favouriteRequest = () => ({
  type: 'FAVORITE_REQUEST'
});

export const saveFavouriteSuccess = (favorite) => ({
  type: 'SAVE_FAVOURITE_SUCCESS', favorite
});

export const saveFavouriteFailure = (error) => ({
  type: 'SAVE_FAVOURITE_FAILURE', error
});

export const removeFavouriteSuccess = (favorite) => ({
  type: 'REMOVE_FAVOURITE_SUCCESS', favorite
});

export const removeFavouriteFailure = (favorite) => ({
  type: 'REMOVE_FAVOURITE_FAILURE', favorite
});

export const getFavouritesSuccess = (favorites) => ({
  type: 'GET_FAVOURITES_SUCCESS', favorites
});

export const getFavouritesFailure = (error) => ({
  type: 'GET_FAVOURITES_FAILURE', error
});

//Favourite API calls

//adds movie to favourites list
export function addToFavourite(payload) {
  return async(dispatch, getState) => {
    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
   
    API.addToFavourite(session_id, payload)
      .then( _ => {
        dispatch(saveFavouriteSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(saveFavouriteFailure(error.response.data))
      });
  }
}

//removes movie from favourites list
export function removeFromFavourite(payload) {
  return async(dispatch, getState) => {
    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
    
    API.addToFavourite(session_id, payload)
      .then( _ => {
        dispatch(removeFavouriteSuccess(payload.media_id))
      })
      .catch(error => {
        dispatch(removeFavouriteFailure(error.response.data))
      });
  }
}

//gets all favourite movies
export function getAllFavourites(page) {
  return async (dispatch, getState) => {

    dispatch(favouriteRequest());
    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
   
    API.getAllFavourites(session_id, page)
      .then(response => {
        dispatch(getFavouritesSuccess(response.data))
      })
      .catch(error => {
        dispatch(getFavouritesFailure(error))
      });
  }
}