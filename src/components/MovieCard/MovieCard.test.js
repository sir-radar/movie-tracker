import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const buildStore = configureStore([thunk]);

afterEach(cleanup)

const renderComponent = (states, props) => {
  const store = buildStore({...states});
  const div = document.createElement("div");
  return render(<Provider store={store}>
                    <MemoryRouter>
                      <MovieCard {...props}/>
                    </MemoryRouter>
                </Provider>, div)
}

const renderComponentForSnapshot = (states, props) => {
  const store = buildStore({...states});
  return (<Provider store={store}>
            <MemoryRouter>
              <MovieCard {...props}/>
            </MemoryRouter>
          </Provider>)
}

const propsData = {
  id: 1,
  title: "Movie title", 
  image: "", 
  overview: "Movie overview", 
  addToFavourite: jest.fn(), 
  removeFavourite: jest.fn(), 
  removeFromWatchList: jest.fn(),
  addToWatchList: jest.fn()
};

const states = {
  auth:{
    session_id: "GHHjsjskkslsllsghsjsksk"
  },
  watchlists:{},
  status:{},
  favourites:{}
}

describe('MovieCard Component', () => {

  it("renders without crashing", () => {
    renderComponent(states, propsData)
  })

  it("renders movie card details", () => {
    const { getByTestId } = renderComponent(states, propsData)
    expect(getByTestId('movie-title')).toHaveTextContent(propsData.title)
    expect(getByTestId('movie-overview')).toHaveTextContent(propsData.overview)
    expect(getByTestId('movie-details-link')).toHaveTextContent("See Details")
  })

  it("display unfavourite sign if movie is not marked as favourite", () => {
    const { queryByTestId } = renderComponent(states, propsData)
    expect(queryByTestId('active-favourite')).toBeNull()
    expect(queryByTestId('inactive-favourite')).not.toBeNull()
  })

  it("should call addToFavourite after unfavourite sign is clicked", () => {
    const { queryByTestId } = renderComponent(states, {...propsData, id:10})
    fireEvent.click(queryByTestId('inactive-favourite'))
    expect(propsData.addToFavourite).toHaveBeenCalled()
  })

  it("display inactive watchlist button if movie is not marked as watchlist", () => {
    const { queryByTestId } = renderComponent(states, {...propsData, id:10})
    expect(queryByTestId('active-watchlist')).toBeNull()
    expect(queryByTestId('inactive-watchlist')).not.toBeNull()
  })

  it("should call addToWatchList after inactive watchlist button is clicked", () => {
    const { queryByTestId } = renderComponent(states, {...propsData, id:10})
    fireEvent.click(queryByTestId('inactive-watchlist'))
    expect(propsData.addToWatchList).toHaveBeenCalled()
  })

  it("matches snapshot", () => {
    const tree = renderer.create(renderComponentForSnapshot(states, propsData)).toJSON();
    expect(tree).toMatchSnapshot();
  })

});