const initialState = {}

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
    
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}