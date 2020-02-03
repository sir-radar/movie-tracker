import API from '../../utils/api';
import {getSessionID} from './authActions'

//Session ID auth API call
export function getMovieState(movieId) {
  return async (dispatch, getState) => {
    await dispatch(getSessionID())
    const session_id = getState().auth.session_id;
    
    try{
      const response = await API.getMovieState(session_id, movieId);
      return response
    }catch(error){
      return 'Error'
    }
  
  }
}