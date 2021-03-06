import API from '../../utils/api';

export const createSession = (session_id) => ({
  type: 'CREATE_SESSION_SUCCESS', session_id
});

export const createSessionFailure = (error) => ({
  type: 'CREATE_SESSION_FAILURE', error
});

//Session ID auth API call
export function getSessionID() {
  return async (dispatch, getState) => {
    let session_id = getState().auth.session_id;
    if(!session_id){
      try{
        const response = await API.createSession();
        dispatch(createSession(response.data.session_id))
      }catch(error){
        dispatch(createSessionFailure(error.response))
      }
    }
  }
}