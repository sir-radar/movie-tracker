import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<MemoryRouter><Nav/></MemoryRouter>, div)
}

describe('Nav Component', () => {

  it("renders without crashing", () => {
    renderComponent()
  })

  it("renders the router links", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId('search')).toHaveTextContent("Search")
    expect(getByTestId('favourite')).toHaveTextContent("Favorites")
    expect(getByTestId('watchlater')).toHaveTextContent("WatchLater")
  })

  it("navigates to favourites page when you click the favourite page link", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId('favourite'));
    expect(getByTestId('favourite').classList.contains('active')).toBe(true)
  })

  it("navigates to watchlist page when you click the watchlist page link", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId('watchlater'));
    expect(getByTestId('watchlater').classList.contains('active')).toBe(true)
  })

  it("search page is the first page to render", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId('search').classList.contains('active')).toBe(true)
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<MemoryRouter><Nav/></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})