import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import search from './reducers/searchReducer';
// import favorites from './reducers/favoritesReducer';
import status from './reducers/statusReducer';
import auth from './reducers/authReducer';

export default createStore(
  combineReducers({
    search,
    // favorites,
    status,
    auth
  }),
  {},
  applyMiddleware(thunk)
)