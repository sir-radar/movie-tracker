const session_id = localStorage.getItem('session_id');
const initialState = {
  session_id
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SESSION_SUCCESS':
      return {...state, session_id: action.session_id}
    case 'CREATE_SESSION_FAILURE':
      return {...state, session_error: action.error}
    default:
      return state;
  }
}