import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MoviePoster from './MoviePoster';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = (props={}) => {
  const div = document.createElement("div");
  return render(<MoviePoster {...props}/>, div)
}

describe('MoviePoster Component', () => {

  it("renders without crashing", () => {
    renderComponent()
  })


  it("matches snapshot", () => {
    const tree = renderer.create(<MoviePoster />).toJSON();
    expect(tree).toMatchSnapshot();
  })

});