import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

afterEach(cleanup)

const renderComponent = (props) => {
  const div = document.createElement("div");
  return render(<SearchBox {...props}/>, div)
}

const propsData = {
  onSearch: jest.fn(), 
  updateSerachQuery: jest.fn()
};

it("renders without crashing", () => {
  renderComponent(propsData)
})

it("It should update input value", () => {
  const { queryByTestId } = renderComponent(propsData)
  fireEvent.change(queryByTestId('search-input'), { target: { value: 'hey' } })
  expect(queryByTestId('search-input').value).toBe('hey')
})

it("should display error message if input value is empty on form submission", () => {
  const { queryByTestId } = renderComponent(propsData)
  expect(queryByTestId('search-input')).toHaveTextContent("")
  fireEvent.change(queryByTestId('search-input'), { target: { value: '' } })
  fireEvent.submit(queryByTestId('search-form'))
  expect(propsData.onSearch).not.toHaveBeenCalled()
  expect(propsData.updateSerachQuery).not.toHaveBeenCalled()
  expect(queryByTestId('search-error')).toHaveTextContent("Type in something!")
  
})

it("should call onSearch and updateSerachQuery on form submission if input value is valid", () => {
  const { queryByTestId } = renderComponent(propsData)
  expect(queryByTestId('search-input')).toHaveTextContent("")
  fireEvent.change(queryByTestId('search-input'), { target: { value: 'hey' } })
  expect(queryByTestId('search-input').value).toBe('hey')
  fireEvent.submit(queryByTestId('search-form'))
  expect(propsData.onSearch).toHaveBeenCalled()
  expect(propsData.updateSerachQuery).toHaveBeenCalled()
  expect(queryByTestId('search-error')).toHaveTextContent("")
})


it("matches snapshot", () => {
  const tree = renderer.create(<SearchBox {...propsData}/>).toJSON();
  expect(tree).toMatchSnapshot();
})