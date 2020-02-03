const initialState = {
  watchLists:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WATCHLIST_SUCCESS':
      return {...state, watchLists: action.watchLists}
    default:
      return state;
  }
}