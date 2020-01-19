const initialState = {
  search: '',
  searchError: '',

  // saveFavorite: '',
  // saveFavoriteError: {},

  // updateRating: '',
  // updateRatingError: {},
  
  // deleteFavorite: '',
  // deleteFavoriteError: {}
}

export default (state = initialState, action) => {
  const actionHandlers = {
    // search statuses
    'SEARCH_REQUEST': {
      search: 'PENDING',
      searchError: '',
    },
    'SEARCH_SUCCESS': {
      search: 'SUCCESS', 
      searchError: '',      
    },
    'SEARCH_FAILURE': {
      search: 'ERROR',
      searchError: action.error, 
    },
    // favourite request statuses
    'FAVORITE_REQUEST': {
      favourites: 'PENDING',
      favouriteError: '',
    },
    'GET_FAVOURITES_SUCCESS': {
      favourites: 'SUCCESS',
      favouriteError: '',
    },
    'GET_FAVOURITES_FAILURE': {
      favourite: 'ERROR',
      favouriteError: action.error
    },
    // // update rating statuses
    // 'UPDATE_RATING_SUCCESS': {
    //   updateRating: 'SUCCESS',
    //   updateRatingError: '',
    // },
    // 'UPDATE_RATING_FAILURE': {
    //   updateRating: 'ERROR',
    //   updateRatingError: { error: action.error },
    // },
    // 'RESET_UPDATE_RATING': {
    //   updateRating: '',
    //   updateRatingError: '',
    // },
    // // delete favorite statuses
    // 'DELETE_FAVORITE_SUCCESS': {
    //   deleteFavorite: 'SUCCESS',
    //   deleteFavoriteError: '',
    // },
    // 'DELETE_FAVORITE_FAILURE': {
    //   deleteFavorite: 'ERROR',
    //   deleteFavoriteError: { errors: action.error },
    // },
    // 'RESET_DELETE_FAVORITE': {
    //   deleteFavorite: '',
    //   deleteFavoriteError: '',
    // }
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}