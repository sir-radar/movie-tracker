import API from '../../utils/api';

export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

export const getFavoritesSuccess = (favorites) => ({
  type: 'GET_FAVORITE_SUCCESS', favorites
});

export const getFavoritesFailure = (error) => ({
  type: 'GET_FAVORITE_FAILURE', error
});

export function addToFavorite(payload) {
  return (dispatch, getState) => {

    // console.log(getState())
    // dispatch(searchRequest());
    const session_id = getState().auth.session_id;
    
    API.addToFavorite(session_id, payload)
      .then(response => {
        console.log(response)
        // dispatch(searchSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
        // dispatch(searchFailure(error.response.data))
      });
  }
}