import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer"

jest.useFakeTimers();

afterEach(cleanup)

const resetStatus = jest.fn();

const renderComponent = (resetStatus) => {
  const div = document.createElement("div");
  return render(<ErrorMessage resetStatus={resetStatus}/>, div)
}

describe('ErrorMessage Component', () => {

  it("should call resetStatus after timing out", () => {
    
    renderComponent(resetStatus)
    // move ahead in time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(resetStatus).not.toHaveBeenCalled();
    // and then move ahead by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(resetStatus).toHaveBeenCalled();

  })

  it("renders page text correctly", () => {
    const { getByTestId } = renderComponent(resetStatus)
    expect(getByTestId('error-message')).toHaveTextContent("Something went wrong")
  })


  it("matches snapshot", () => {
    const tree = renderer.create(<ErrorMessage resetStatus={resetStatus}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})