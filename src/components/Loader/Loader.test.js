import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Loader from './Loader';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = () => {
  const div = document.createElement("div");
  return render(<Loader/>, div)
}

it("renders without crashing", () => {
  renderComponent()
})


it("matches snapshot", () => {
  const tree = renderer.create(<Loader/>).toJSON();
  expect(tree).toMatchSnapshot();
})