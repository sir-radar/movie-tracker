const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FAVOURITE_SUCCESS':
      // return {...state, favouriteMoviesID:[...state.favouriteMoviesID, action.favorite]}
      break;
    case 'REMOVE_FAVOURITE_SUCCESS':
      //remove favourite from state if it exist
      // if(state.favouriteMovies){
      //   const newFavouriteMovies = state.favouriteMovies.results.filter( val => val.id !== action.favorite );
      //   return {...state, favouriteMovies: {...state.favouriteMovies, results:[...newFavouriteMovies]}}
      // }
      // return {...state}
      break;
    case 'GET_FAVOURITES_SUCCESS':
      return {...state, favouriteMovies: action.favorites}
    default:
      return state;
  }
}