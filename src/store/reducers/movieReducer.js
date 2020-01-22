const initialState = {}

export default (state = initialState, action) => {
  if (action.type === 'GET_MOVIE_DETAILS_SUCCESS') {
    state = action.movieDetails;
  }
  return state;
}