import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from '@testing-library/react';
import Header from './Header';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<MemoryRouter><Header/></MemoryRouter>, div)
}

describe('Header Component', () => {

  it("renders without crashing", () => {
    renderComponent()
  })

  it("renders the router links", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId('header-link')).toHaveTextContent("Movie Tracker")

  })

  it("navigates to home page when you click the header link", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId('header-link'));
    expect(location.pathname).toBe('/')
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<MemoryRouter><Header/></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})