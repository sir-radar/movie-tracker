const favouriteMoviesID = JSON.parse(localStorage.getItem('favourites'));
const initialState = {
  favouriteMoviesID: favouriteMoviesID || []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FAVORITE_SUCCESS':
      localStorage.setItem("favourites", JSON.stringify([...state.favouriteMoviesID, action.favorite]));
      return {...state, favouriteMoviesID:[...state.favouriteMoviesID, action.favorite]}
    case 'REMOVE_FAVORITE_SUCCESS':
      const newFavouriteMoviesId = state.favouriteMoviesID.filter( val => val !== action.favorite );
      localStorage.setItem("favourites", JSON.stringify(newFavouriteMoviesId));
      return {...state, favouriteMoviesID: [...newFavouriteMoviesId]}
    case 'GET_FAVORITES_SUCCESS':
      return {...state, favouriteMovies: action.favorites}
    default:
      return state;
  }
}