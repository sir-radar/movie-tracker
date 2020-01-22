import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = (props) => {
  const div = document.createElement("div");
  return render(<Pagination {...props}/>, div)
}

const propsData = {
  page: 1,
  pages: 5, 
  searchMore: jest.fn()
};

it("renders without crashing", () => {
  renderComponent(propsData)
})

it("renders pagination correctly", () => {
  const { queryByTestId } = renderComponent(propsData)
  expect(queryByTestId('active-prev')).toBeNull()
  expect(queryByTestId('inactive-prev')).not.toBeNull()
  expect(queryByTestId('pagination-detail')).toHaveTextContent(`Page ${propsData.page} of ${propsData.pages}`)
  expect(queryByTestId('active-next')).not.toBeNull()
  expect(queryByTestId('inactive-next')).toBeNull()
})

it("renders active previous button if page is greater than one", () => {
  const newpage = 2;
  const { queryByTestId } = renderComponent({...propsData, page: newpage})
  expect(queryByTestId('active-prev')).not.toBeNull()
  expect(queryByTestId('inactive-prev')).toBeNull()
  expect(queryByTestId('pagination-detail')).toHaveTextContent(`Page ${newpage} of ${propsData.pages}`)
  expect(queryByTestId('active-next')).not.toBeNull()
  expect(queryByTestId('inactive-next')).toBeNull()
})

it("renders inactive next button if page is greater or equal to pages", () => {
  const newpage = 5;
  const { queryByTestId } = renderComponent({...propsData, page: newpage})
  expect(queryByTestId('active-prev')).not.toBeNull()
  expect(queryByTestId('inactive-prev')).toBeNull()
  expect(queryByTestId('pagination-detail')).toHaveTextContent(`Page ${newpage} of ${propsData.pages}`)
  expect(queryByTestId('active-next')).toBeNull()
  expect(queryByTestId('inactive-next')).not.toBeNull()
})

it("should call searchMore if active previous button or active next button is clicked", () => {
  const newpage = 2;
  const { queryByTestId } = renderComponent({...propsData, page: newpage})
  expect(queryByTestId('active-prev')).not.toBeNull()
  fireEvent.click(queryByTestId('active-prev'));
  expect(propsData.searchMore).toHaveBeenCalled()
  expect(queryByTestId('inactive-prev')).toBeNull()
  expect(queryByTestId('pagination-detail')).toHaveTextContent(`Page ${newpage} of ${propsData.pages}`)
  expect(queryByTestId('active-next')).not.toBeNull()
  fireEvent.click(queryByTestId('active-next'));
  expect(propsData.searchMore).toHaveBeenCalled()
  expect(queryByTestId('inactive-next')).toBeNull()
})

it("matches snapshot", () => {
  const tree = renderer.create(<Pagination {...propsData}/>).toJSON();
  expect(tree).toMatchSnapshot();
})