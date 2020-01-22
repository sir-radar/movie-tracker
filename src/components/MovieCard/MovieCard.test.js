import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = (props) => {
  const div = document.createElement("div");
  return render(<MemoryRouter><MovieCard {...props}/></MemoryRouter>, div)
}

const propsData = {
  id: 1,
  title: "Movie title", 
  image: "", 
  overview: "Movie overview", 
  addToFavourite: jest.fn(), 
  removeFavourite: jest.fn(), 
  favouriteIDs: [1,2,3,4],
  removeFromWatchList: jest.fn(),
  addToWatchList: jest.fn(),
  watchlistIDs: [1,2,3,4]
};

describe('MovieCard Component', () => {

  it("renders without crashing", () => {
    renderComponent(propsData)
  })

  it("renders movie card details", () => {
    const { getByTestId } = renderComponent(propsData)
    expect(getByTestId('movie-title')).toHaveTextContent(propsData.title)
    expect(getByTestId('movie-overview')).toHaveTextContent(propsData.overview)
    expect(getByTestId('movie-details-link')).toHaveTextContent("See Details")
  })

  it("display favourite sign if movie is marked as favourite", () => {
    const { getByTestId, queryByTestId } = renderComponent(propsData)
    expect(getByTestId('active-favourite')).not.toBeNull()
    expect(queryByTestId('inactive-favourite')).toBeNull()
  })

  it("display unfavourite sign if movie is not marked as favourite", () => {
    const { queryByTestId } = renderComponent({...propsData, id:10})
    expect(queryByTestId('active-favourite')).toBeNull()
    expect(queryByTestId('inactive-favourite')).not.toBeNull()
  })

  it("should call removeFavourite after favourite sign is clicked", () => {
    const { queryByTestId } = renderComponent(propsData)
    fireEvent.click(queryByTestId('active-favourite'))
    expect(propsData.removeFavourite).toHaveBeenCalled()
  })

  it("should call addToFavourite after unfavourite sign is clicked", () => {
    const { queryByTestId } = renderComponent({...propsData, id:10})
    fireEvent.click(queryByTestId('inactive-favourite'))
    expect(propsData.addToFavourite).toHaveBeenCalled()
  })

  it("display active watchlist button if movie is marked as watchlist", () => {
    const { getByTestId, queryByTestId } = renderComponent(propsData)
    expect(getByTestId('active-watchlist')).not.toBeNull()
    expect(queryByTestId('inactive-watchlist')).toBeNull()
  })

  it("display inactive watchlist button if movie is not marked as watchlist", () => {
    const { queryByTestId } = renderComponent({...propsData, id:10})
    expect(queryByTestId('active-watchlist')).toBeNull()
    expect(queryByTestId('inactive-watchlist')).not.toBeNull()
  })

  it("should call removeFromWatchList after active watchlist button is clicked", () => {
    const { queryByTestId } = renderComponent(propsData)
    fireEvent.click(queryByTestId('active-watchlist'))
    expect(propsData.removeFromWatchList).toHaveBeenCalled()
  })

  it("should call addToWatchList after inactive watchlist button is clicked", () => {
    const { queryByTestId } = renderComponent({...propsData, id:10})
    fireEvent.click(queryByTestId('inactive-watchlist'))
    expect(propsData.addToWatchList).toHaveBeenCalled()
  })

  // it("navigates to movie deatils page when you click the movie details page link", () => {
  //   const { getByTestId } = renderComponent(propsData)
  //   fireEvent.click(getByTestId('movie-details-link'));
  //   expect(document.querySelector('[data-testid="movie-details-page"]')).not.toBeNull()
  // })

  it("matches snapshot", () => {
    const tree = renderer.create(<MemoryRouter><MovieCard {...propsData}/></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  })

});