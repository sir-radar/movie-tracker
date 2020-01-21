import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NoData from './NoData';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<NoData/>, div)
}

it("renders without crashing", () => {
  renderComponent()
})

it("renders the router links", () => {
  const { getByTestId } = renderComponent()
  expect(getByTestId('nodata')).toHaveTextContent("No data to display")
})

it("matches snapshot", () => {
  const tree = renderer.create(<NoData/>).toJSON();
  expect(tree).toMatchSnapshot();
})