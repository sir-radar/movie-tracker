import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Page404 from './404Page';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

jest.useFakeTimers();

afterEach(cleanup)

const resetStatus = jest.fn();

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<Page404/>, div)
}

describe('Page404 Component', () => {

  it("renders without crashing", () => {
    renderComponent()
  })

  it("does not render nav", () => {
    const {queryByTestId} = renderComponent()
    expect(queryByTestId("nav")).toBeNull()
  })

  it("renders page text correctly", () => {
    const { getByText } = renderComponent(resetStatus)
    expect(getByText('404')).not.toBeNull()
    expect(getByText('Page Not Found')).not.toBeNull()
  })


  it("matches snapshot", () => {
    const tree = renderer.create(<Page404/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})