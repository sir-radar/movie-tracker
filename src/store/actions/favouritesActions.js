import API from '../../utils/api';
import {getSessionID} from './authActions'

export const favouriteRequest = () => ({
  type: 'FAVORITE_REQUEST'
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
   
    return await API.addOrRemoveFavourite(session_id, payload)
  }
}

//removes movie from favourites list
export function removeFromFavourite(payload) {
  return async(dispatch, getState) => {
    //checks if session_id exists if not, gets it
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
    
    API.addOrRemoveFavourite(session_id, payload)
      .then( _ => {
        //move to the previous page when all results in a page is removed
        //this helps pagination
        const favouritesMovies = getState().favourites.favouriteMovies;

        if(favouritesMovies.page > 1 && favouritesMovies.results.length < 1){
          dispatch(getAllFavourites(--favouritesMovies.page))
        }else{
          dispatch(getAllFavourites(favouritesMovies.page))
        }
      })
      .catch(error => {
        dispatch(removeFavouriteFailure(error.response))
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