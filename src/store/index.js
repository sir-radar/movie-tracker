import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import search from './reducers/searchReducer';
import favourites from './reducers/favouritesReducer';
import status from './reducers/statusReducer';
import auth from './reducers/authReducer';

export default createStore(
  combineReducers({
    search,
    favourites,
    status,
    auth
  }),
  {},
  applyMiddleware(thunk)
)