import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";


const buildStore = configureStore([thunk]);

afterEach(cleanup)

const renderComponent = (states) => {
  const store = buildStore({...states});
  const div = document.createElement("div");
  return render(<Provider store={store}><MemoryRouter><App/></MemoryRouter></Provider>, div)
}

describe('Nav Component', () => {

  it("renders without crashing", () => {
    const state = {
      search:{},
      status:{},
      favourites:{},
      watchlists:{}
    }
    renderComponent(state)
  })

  it("renders the header component", () => {
    const state = {
      search:{},
      status:{},
      favourites:{},
      watchlists:{}
    }
    const {queryByTestId} = renderComponent(state)
    
    expect(queryByTestId('header-link')).not.toBeNull()
  })

})