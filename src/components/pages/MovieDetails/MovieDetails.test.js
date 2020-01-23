import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";


const buildStore = configureStore([thunk]);

afterEach(cleanup)

const renderComponent = (states) => {
  //mock store
  const store = buildStore({...states});
  const div = document.createElement("div");
  const props={
    params:{
      id: 4566
    }
  }
  return render(<Provider store={store}><MemoryRouter><MovieDetails match={props} /></MemoryRouter></Provider>, div)
}

const renderComponentForSnapshot = (states) => {
  const store = buildStore({...states});
  const props={
    params:{
      id: 4566
    }
  }
  return <Provider store={store}><MemoryRouter><MovieDetails match={props} /></MemoryRouter></Provider>
}

describe('MovieDetails Page Component', () => {

  it("renders without crashing", async () => {

    const states = {
      status:{
        movieDetailsAction: 'PENDING'
      },
      movie:{},
    }

    renderComponent(states)
    
  })

  it("renders nav component", () => {

    const states = {
      status:{
        movieDetailsAction: ''
      },
      movie:{},
    }

    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("movie-poster")).toBeNull()
    expect(queryByTestId("movie-summary")).toBeNull()
    expect(queryByTestId("trailer")).toBeNull()
  })

  it("renders loading component on pending request", () => {

    const states = {
      status:{
        movieDetailsAction: 'PENDING'
      },
      movie:{}
    }

    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("loader")).not.toBeNull()
    expect(queryByTestId("movie-poster")).toBeNull()
    expect(queryByTestId("movie-summary")).toBeNull()
    expect(queryByTestId("trailer")).toBeNull()
  })

  it("renders Movie Poster component and summary on successful request", () => {

    const states = {
      status:{
        movieDetailsAction: 'SUCCESS'
      },
      movie:{
        poster_path: "",
        genres:[],
        spoken_languages:[],
        videos:{
          results:[]
        }
      }
    }

    const {queryByTestId} = renderComponent(states)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("movie-poster")).not.toBeNull()
    expect(queryByTestId("movie-summary")).not.toBeNull()
    expect(queryByTestId("trailer")).toBeNull()

  })


  it("shows trailer when show trailer button is clicked", () => {
    const states = {
      status:{
        movieDetailsAction: 'SUCCESS'
      },
      movie:{
        poster_path: "",
        genres:[],
        spoken_languages:[],
        videos:{
          results:[
            {key:"TjjUklNKLL"}
          ]
        }
      }
    }

    const {queryByTestId, getByTestId} = renderComponent(states)
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("movie-poster")).not.toBeNull()
    expect(queryByTestId("movie-summary")).not.toBeNull()
    expect(queryByTestId("trailer-trigger")).not.toBeNull()
    fireEvent.click(getByTestId('trailer-trigger'))
    expect(queryByTestId("trailer")).not.toBeNull()

  })

  
  it("matches snapshot", () => {
    const states = {
      status:{
        movieDetailsAction: 'SUCCESS'
      },
      movie:{
        poster_path: "",
        genres:[],
        spoken_languages:[],
        videos:{
          results:[
            {key:"TjjUklNKLL"}
          ]
        }
      }
    }
    const tree = renderer.create(renderComponentForSnapshot(states)).toJSON();
    expect(tree).toMatchSnapshot();
  })

})