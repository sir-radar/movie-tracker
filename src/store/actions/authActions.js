import API from '../../utils/api';

export const createSession = (session_id) => ({
  type: 'CREATE_SESSION_SUCCESS', session_id
});

export const createSessionFailure = (error) => ({
  type: 'CREATE_SESSION_FAILURE', error
});

export function getSessionID() {
  return (dispatch) => {
    // console.log(getState())
    // dispatch(searchRequest());
    // const session_id = getState().auth.session_id;
    // console.log(session_id)
    
    API.createSession()
      .then(response => {
        console.log(response)
        localStorage.setItem("session_id", response.data.session_id)
        dispatch(createSession(response.data.session_id))
      })
      .catch(error => {
        dispatch(createSessionFailure(error.response.data))
      });
  }
}