import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import SearchPage from './SearchPage';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';

//reducers
import search from '../../../store/reducers/searchReducer';
import status from '../../../store/reducers/statusReducer';
import favourites from '../../../store/reducers/favouritesReducer';
import watchlists from '../../../store/reducers/watchListReducer';

//actions
import {searchRequest} from '../../../store/actions/searchActions';

afterEach(cleanup)

const renderComponent = (reducers) => {
  const store = createStore(combineReducers({...reducers}));
  const div = document.createElement("div");
  return render(<Provider store={store}><MemoryRouter><SearchPage /></MemoryRouter></Provider>, div)
}

const renderComponentForSnapshot = (reducers) => {
  const store = createStore(combineReducers({...reducers}));
  return <Provider store={store}><MemoryRouter><SearchPage /></MemoryRouter></Provider>
}

describe('Search Page Component', () => {

  it("renders without crashing", () => {
    const reducers = {
      search,
      favourites,
      status,
      watchlists
    }
    renderComponent(reducers)
  })

  it("renders nav component", () => {
    const reducers = {
      search,
      favourites,
      status,
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
  })

  it("renders search box component", () => {
    const reducers = {
      search,
      favourites,
      status,
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("search-box")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
  })

  it("renders loading component on pending request", () => {
    const statusState = {
      search: 'PENDING',
      favourite:'',
      favouriteAction:'',
      watchlist:'',
      watchlistAction:''
    }
    const searchState = {}

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("search-box")).not.toBeNull()
    expect(queryByTestId("loader")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Movie Card component on successful request", () => {
    const statusState = {
      search: 'SUCCESS',
      favourite:'',
      favouriteAction:'',
      watchlist:'',
      watchlistAction:''
    }
    const searchState = {
      results:[
        {
          id: 1,
          title: "Some text",
          overview: 'some text',
          poster_path:""
        }
      ]
    }

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("movie-card")).not.toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })


  it("renders NoData component on successful request with empty data", () => {
    const statusState = {
      search: 'SUCCESS',
      favourite:'',
      favouriteAction:'',
      watchlist:'',
      watchlistAction:''
    }
    const searchState = {
      results:[]
    }

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Error component on failed request", () => {
    const statusState = {
      search: 'ERROR',
      favourite:'',
      favouriteAction:'',
      watchlist:'',
      watchlistAction:''
    }
    const searchState = {
      results:[]
    }

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId} = renderComponent(reducers)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).not.toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Pagination component on successful request with more than 20 results", () => {
    const statusState = {
      search: 'SUCCESS',
      favourite:'',
      favouriteAction:'',
      watchlist:'',
      watchlistAction:''
    }
    const searchState = {
      results:[
        {id: 1, title:'', overview:''},
        {id: 2,title:'', overview:''}
      ],
      total_results: 21,
      page: 1,
      pages: 2
    }

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId, queryAllByTestId} = renderComponent(reducers)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryAllByTestId("movie-card").length).toBe(searchState.results.length)
    expect(queryByTestId("pagination")).not.toBeNull()

  })

  it("renders Error Message component on failed add/remove favourite or watchlist request", () => {
    const statusState = {
      search: 'SUCCESS',
      favourite:'',
      favouriteAction:'ERROR',
      watchlist:'',
      watchlistAction:'ERROR'
    }
    const searchState = {
      results:[
        {id: 1, title:'', overview:''},
        {id: 2,title:'', overview:''}
      ],
      total_results: 21,
      page: 1,
      pages: 2
    }

    const reducers = {
      search:()=>search(searchState, searchRequest),
      favourites,
      status:()=>status(statusState, searchRequest),
      watchlists
    }
    const {queryByTestId, queryAllByTestId} = renderComponent(reducers)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).not.toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryAllByTestId("movie-card").length).toBe(searchState.results.length)
    expect(queryByTestId("pagination")).not.toBeNull()

  })


  it("matches snapshot", () => {
    const reducers = {
      search,
      favourites,
      status,
      watchlists
    }
    const tree = renderer.create(renderComponentForSnapshot(reducers)).toJSON();
    expect(tree).toMatchSnapshot();
  })

})