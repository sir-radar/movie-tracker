import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import SearchPage from './SearchPage';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

//reducers
// import search from '../../../store/reducers/searchReducer';
// import status from '../../../store/reducers/statusReducer';
// import favourites from '../../../store/reducers/favouritesReducer';
// import watchlists from '../../../store/reducers/watchListReducer';

//actions
// import {searchRequest} from '../../../store/actions/searchActions';

const buildStore = configureStore([thunk]);

afterEach(cleanup)

const renderComponent = (states) => {
  const store = buildStore({...states});
  const div = document.createElement("div");
  return render(<Provider store={store}><MemoryRouter><SearchPage /></MemoryRouter></Provider>, div)
}

const renderComponentForSnapshot = (states) => {
  const store = buildStore({...states});
  return <Provider store={store}><MemoryRouter><SearchPage /></MemoryRouter></Provider>
}

describe('Search Page Component', () => {

  it("renders without crashing", () => {
    const states = {
      search:{},
      favourites:{},
      status:{},
      watchlists:{}
    }
    renderComponent(states)
  })

  it("renders nav component", () => {
    const states = {
      search:{},
      favourites:{},
      status:{},
      watchlists:{}
    }
    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
  })

  it("renders search box component", () => {
    const states = {
      search:{},
      favourites:{},
      status:{},
      watchlists:{}
    }
    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("search-box")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
  })

  it("renders loading component on pending request", () => {
   
    const states = {
      search:{},
      favourites:{},
      status:{
        search: 'PENDING',
        favourite:'',
        favouriteAction:'',
        watchlist:'',
        watchlistAction:''
      },
      watchlists:{}
    }

    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("search-box")).not.toBeNull()
    expect(queryByTestId("loader")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Movie Card component on successful request", () => {
    const states = {
      search:{
        results:[
          {
            id: 1,
            title: "Some text",
            overview: 'some text',
            poster_path:""
          }
        ]
      },
      favourites:{},
      status:{
        search: 'SUCCESS',
        favourite:'',
        favouriteAction:'',
        watchlist:'',
        watchlistAction:''
      },
      watchlists:{},
      auth:{
        session_id: "GHHjsjskkslsllsghsjsksk"
      },
    }
    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("movie-card")).not.toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })


  it("renders NoData component on successful request with empty data", () => {

    const states = {
      search:{
        results:[]
      },
      favourites:{},
      status:{
        search: 'SUCCESS',
        favourite:'',
        favouriteAction:'',
        watchlist:'',
        watchlistAction:''
      },
      watchlists:{},
      auth:{
        session_id: "GHHjsjskkslsllsghsjsksk"
      },
    }

   
    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).not.toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Error component on failed request", () => {

    const states = {
      search:{
        results:[]
      },
      favourites:{},
      status:{
        search: 'ERROR',
        favourite:'',
        favouriteAction:'',
        watchlist:'',
        watchlistAction:''
      },
      watchlists:{},
      auth:{
        session_id: "GHHjsjskkslsllsghsjsksk"
      },
    }
    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).not.toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()

  })

  it("renders Pagination component on successful request with more than 20 results", () => {

    const states = {
      search:{
        results:[
          {id: 1, title:'', overview:''},
          {id: 2,title:'', overview:''}
        ],
        total_results: 21,
        page: 1,
        pages: 2
      },
      favourites:{},
      status:{
        search: 'SUCCESS',
        favourite:'',
        favouriteAction:'',
        watchlist:'',
        watchlistAction:''
      },
      watchlists:{},
      auth:{
        session_id: "GHHjsjskkslsllsghsjsksk"
      },
    }

    const {queryByTestId, queryAllByTestId} = renderComponent(states)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryAllByTestId("movie-card").length).toBe(states.search.results.length)
    expect(queryByTestId("pagination")).not.toBeNull()

  })

  it("renders Error Message component on failed add/remove favourite or watchlist request", () => {

    const states = {
      search:{
        results:[
          {id: 1, title:'', overview:''},
          {id: 2,title:'', overview:''}
        ],
        total_results: 21,
        page: 1,
        pages: 2
      },
      favourites:{},
      status:{
        search: 'SUCCESS',
        favourite:'',
        favouriteAction:'ERROR',
        watchlist:'',
        watchlistAction:'ERROR'
      },
      watchlists:{},
      auth:{
        session_id: "GHHjsjskkslsllsghsjsksk"
      },
    }
    const {queryByTestId, queryAllByTestId} = renderComponent(states)
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("error-message")).not.toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryAllByTestId("movie-card").length).toBe(states.search.results.length)
    expect(queryByTestId("pagination")).not.toBeNull()

  })


  it("matches snapshot", () => {
    const states = {
      search:{},
      favourites:{},
      status:{},
      watchlists:{}
    }
    const tree = renderer.create(renderComponentForSnapshot(reducers)).toJSON();
    expect(tree).toMatchSnapshot();
  })

})