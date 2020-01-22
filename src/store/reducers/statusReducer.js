const initialState = {
  search: '',
  favourite:'',
  favouriteAction:'',
  watchlist:'',
  watchlistAction:'',
  movieDetailsAction:''
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
      favourite: 'PENDING',
      favouriteError: '',
    },
    'GET_FAVOURITES_SUCCESS': {
      favourite: 'SUCCESS',
      favouriteError: '',
    },
    'GET_FAVOURITES_FAILURE': {
      favourite: 'ERROR',
      favouriteError: action.error
    },
    'SAVE_FAVOURITE_FAILURE': {
      favouriteAction: 'ERROR',
      favouriteError: action.error
    },
    'REMOVE_FAVOURITE_FAILURE': {
      favouriteAction: 'ERROR',
      favouriteError: action.error
    },
    // watchlist request statuses
    'WATCHLIST_REQUEST': {
      watchlist: 'PENDING',
      watchlistError: '',
    },
    'GET_WATCHLIST_SUCCESS': {
      watchlist: 'SUCCESS',
      watchlistError: '',
    },
    'GET_WATCHLIST_FAILURE': {
      watchlist: 'ERROR',
      watchlistError: action.error
    },
    'SAVE_WATCHLIST_FAILURE': {
      watchlistAction: 'ERROR',
      watchlistError: action.error
    },
    'REMOVE_WATCHLIST_FAILURE': {
      watchlistAction: 'ERROR',
      watchlistError: action.error
    },
    'RESET_ERROR_STATUS': {
      watchlistAction: '',
      favouriteAction:'',
      watchlistError: '',
      favouriteError:''
    },
    //Movie details request status
    'MOVIE_REQUEST': {
      movieDetailsAction: 'PENDING'
    },
    'GET_MOVIE_DETAILS_SUCCESS': {
      movieDetailsAction: 'SUCCESS'
    },
    'GET_MOVIE_DETAILS_FAILURE': {
      movieDetailsAction: 'ERROR'
    },
    
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}