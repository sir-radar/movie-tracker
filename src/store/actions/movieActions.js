import API from '../../utils/api';

export const movieRequest = () => ({
  type: 'MOVIE_REQUEST'
});

export const getMovieDetailsSuccess = (movieDetails) => ({
  type: 'GET_MOVIE_DETAILS_SUCCESS', movieDetails
});

export const getMovieFail = (error) => ({
  type: 'GET_MOVIE_DETAILS_FAILURE', error
});

//make request to get movie details
export function getMovieDetails(id) {
  return (dispatch) => {

    dispatch(movieRequest());
   
    API.getMovieDetails(id)
      .then(response => {
        console.log(response)
        dispatch(getMovieDetailsSuccess(response.data))
      })
      .catch(error => {
        dispatch(getMovieFail(error))
      });
  }
}