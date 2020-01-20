import API from '../../utils/api';

export const searchRequest = () => ({
  type: 'SEARCH_REQUEST'
});

export const searchSuccess = (result) => ({
  type: 'SEARCH_SUCCESS', result
});

export const searchFailure = (error) => ({
  type: 'SEARCH_FAILURE', error
});

//Search API calls
export function search(title, page) {
  return (dispatch) => {

    dispatch(searchRequest());

    API.search(title, page)
      .then(response => {
        dispatch(searchSuccess(response.data))
      })
      .catch(error => {
        dispatch(searchFailure(error.response.data))
      });
  }
}