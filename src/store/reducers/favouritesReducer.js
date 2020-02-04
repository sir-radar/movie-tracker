const initialState = {
  favouriteMovies:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVOURITES_SUCCESS':
      return {...state, favouriteMovies: action.favorites}
    default:
      return state;
  }
}