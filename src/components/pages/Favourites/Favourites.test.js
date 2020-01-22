import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import Favourites from './Favourites';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";


const buildStore = configureStore([thunk]);

//reducers
import auth from '../../../store/reducers/authReducer';



afterEach(cleanup)

const renderComponent = (states) => {
  //mock store
  const store = buildStore({...states});
  const div = document.createElement("div");
  return render(<Provider store={store}><MemoryRouter><Favourites /></MemoryRouter></Provider>, div)
}

const renderComponentForSnapshot = (states) => {
  const store = buildStore({...states});
  return <Provider store={store}><MemoryRouter><Favourites /></MemoryRouter></Provider>
}

it("renders without crashing", async () => {

  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'PENDING',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{},
      favouriteMoviesID:[]
    }
  }

  renderComponent(states)
  
})

it("renders nav component", () => {

  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'PENDING',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{},
      favouriteMoviesID:[]
    }
  }

  const {queryByTestId} = renderComponent(states)
  expect(queryByTestId("nav")).not.toBeNull()
  expect(queryByTestId("movie-card")).toBeNull()
  expect(queryByTestId("pagination")).toBeNull()
})

it("renders loading component on pending request", () => {

  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'PENDING',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{},
      favouriteMoviesID:[]
    }
  }

  const {queryByTestId} = renderComponent(states)
  expect(queryByTestId("nav")).not.toBeNull()
  expect(queryByTestId("loader")).not.toBeNull()
  expect(queryByTestId("movie-card")).toBeNull()
  expect(queryByTestId("pagination")).toBeNull()

})

it("renders Movie Card component on successful request with at least one result", () => {

  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'SUCCESS',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{
        results:[
          {id: 1, title:'hey', overview:'hey'}
        ]
      },
      favouriteMoviesID:[]
    }
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
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'SUCCESS',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{
        results:[]
      },
      favouriteMoviesID:[]
    }
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
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'ERROR',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{
        results:[]
      },
      favouriteMoviesID:[]
    }
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
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'SUCCESS',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{
        results:[
          {id: 1, title:'hey', overview:'hey'}
        ],
        total_results: 21,
        page: 1,
        total_pages: 2
      },
      favouriteMoviesID:[]
    }
  }

  
  const {queryByTestId, queryAllByTestId} = renderComponent(states)
  expect(queryByTestId("loader")).toBeNull()
  expect(queryByTestId("error")).toBeNull()
  expect(queryByTestId("error-message")).toBeNull()
  expect(queryByTestId("nodata-component")).toBeNull()
  expect(queryAllByTestId("movie-card").length).toBe(states.favourites.favouriteMovies.results.length)
  expect(queryByTestId("pagination")).not.toBeNull()

})

it("renders Error Message component on failed add/remove favourite or watchlist request", () => {
  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'SUCCESS',
      watchlistAction:'ERROR',
      favouriteAction:'ERROR'
    },
    favourites:{
      favouriteMovies:{
        results:[
          {id: 1, title:'hey', overview:'hey'}
        ],
        total_results: 21,
        page: 1,
        total_pages: 2
      },
      favouriteMoviesID:[]
    }
  }

  
  const {queryByTestId, queryAllByTestId} = renderComponent(states)
  expect(queryByTestId("loader")).toBeNull()
  expect(queryByTestId("error")).toBeNull()
  expect(queryByTestId("error-message")).not.toBeNull()
  expect(queryByTestId("nodata-component")).toBeNull()
  expect(queryAllByTestId("movie-card").length).toBe(states.favourites.favouriteMovies.results.length)
  expect(queryByTestId("pagination")).not.toBeNull()

})


it("matches snapshot", () => {
  const states = {
    auth,
    watchlists:{
      watchListsID:[1,2,3],
    },
    status:{
      favourite: 'PENDING',
      watchlistAction:'',
      favouriteAction:''
    },
    favourites:{
      favouriteMovies:{},
      favouriteMoviesID:[]
    }
  }
  const tree = renderer.create(renderComponentForSnapshot(states)).toJSON();
  expect(tree).toMatchSnapshot();
})