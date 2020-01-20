//get saved watchlist movies id from localstorage
const watchListsID = JSON.parse(localStorage.getItem('watchList'));
const initialState = {
  watchListsID: watchListsID || []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_WATCHLIST_SUCCESS':
      //save watchlist movies id to localstorage
      localStorage.setItem("watchList", JSON.stringify([...state.watchListsID, action.watchList]));
      return {...state, watchListsID:[...state.watchListsID, action.watchList]}
    case 'REMOVE_WATCHLIST_SUCCESS':
      const newWatchListsId = state.watchListsID.filter( val => val !== action.watchList);
      localStorage.setItem("watchList", JSON.stringify(newWatchListsId));
      //remove watchlist from state if it exist
      if(state.watchLists){
        const newwatchLists = state.watchLists.results.filter( val => val.id !== action.watchList );
        return {...state, watchListsID: [...newWatchListsId], watchLists: {...state.watchLists, results:[...newwatchLists]}}
      }
      return {...state, watchListsID: [...newWatchListsId]}
    case 'GET_WATCHLIST_SUCCESS':
      return {...state, watchLists: action.watchLists}
    default:
      return state;
  }
}