const favouriteMoviesID = JSON.parse(localStorage.getItem('favourites'));
const initialState = {
  favouriteMoviesID: favouriteMoviesID || []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FAVOURITE_SUCCESS':
      localStorage.setItem("favourites", JSON.stringify([...state.favouriteMoviesID, action.favorite]));
      return {...state, favouriteMoviesID:[...state.favouriteMoviesID, action.favorite]}
    case 'REMOVE_FAVOURITE_SUCCESS':
      const newFavouriteMoviesId = state.favouriteMoviesID.filter( val => val !== action.favorite );
      const newFavouriteMovies = state.favouriteMovies.results.filter( val => val.id !== action.favorite );
      localStorage.setItem("favourites", JSON.stringify(newFavouriteMoviesId));
      return {...state, favouriteMoviesID: [...newFavouriteMoviesId], favouriteMovies: {...state.favouriteMovies, results:[...newFavouriteMovies]}}
    case 'GET_FAVOURITES_SUCCESS':
      return {...state, favouriteMovies: action.favorites}
    default:
      return state;
  }
}