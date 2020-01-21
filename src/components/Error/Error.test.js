import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Error from './Error';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<Error/>, div)
}

it("renders without crashing", () => {
  renderComponent()
})

it("renders page texts correctly", () => {
  const { getByTestId } = renderComponent()
  expect(getByTestId('error-header')).toHaveTextContent("Opps")
  expect(getByTestId('error-body')).toHaveTextContent("Something went wrong. Please check your internet and try again")
})

it("matches snapshot", () => {
  const tree = renderer.create(<Error/>).toJSON();
  expect(tree).toMatchSnapshot();
})