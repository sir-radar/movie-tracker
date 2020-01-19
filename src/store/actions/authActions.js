import API from '../../utils/api';

export const createSession = (session_id) => ({
  type: 'CREATE_SESSION_SUCCESS', session_id
});

export const createSessionFailure = (error) => ({
  type: 'CREATE_SESSION_FAILURE', error
});

//Session ID auth API call
export function getSessionID() {

  return (dispatch) => {

    API.createSession()
      .then(response => {
        dispatch(createSession(response.data.session_id))
      })
      .catch(error => {
        dispatch(createSessionFailure(error.response.data))
      });
  }
}