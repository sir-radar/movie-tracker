import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import PageLayout from './PageLayout';
import SearchBox from '../SearchBox/SearchBox';
import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import NoData from '../NoData/NoData';
import Pagination from '../Pagination/Pagination';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const buildStore = configureStore([thunk]);


afterEach(cleanup)

const renderComponent = (props={}) => {
  const states = {
    search:{},
    favourites:{},
    status:{},
    watchlists:{},
    auth:{
      session_id: "kkekdllldldll"
    }
  }
  const store = buildStore({...states});
  const div = document.createElement("div");
  return render(<Provider store={store}><MemoryRouter><PageLayout {...props}/></MemoryRouter></Provider>, div)
}

describe('PageLayout Component', () => {

  it("renders without crashing", () => {
    renderComponent()
  })

  it("renders without any content", () => {
    const {queryByTestId} = renderComponent()
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("render nav component when showNav props is passed into it ", () => {
    const {queryByTestId} = renderComponent({showNav: true})
    expect(queryByTestId("nav")).not.toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders seach box component when passed as props", () => {
    const { queryByTestId } = renderComponent({searchbox: <SearchBox/>})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).not.toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders MoviesCard component when passed as props", () => {
    const movieCarPpropsData = {
      id: 1,
      title: "Movie title", 
      image: "", 
      overview: "Movie overview", 
      addToFavourite: jest.fn(), 
      removeFavourite: jest.fn(), 
      removeFromWatchList: jest.fn(),
      addToWatchList: jest.fn(),
    };
    const { queryByTestId } = renderComponent({pageContent: <MovieCard {...movieCarPpropsData}/>})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).not.toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders Loader component when passed as props", () => {
    const { queryByTestId } = renderComponent({loader: <Loader />})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("loader")).not.toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders Error component when passed as props", () => {
    const { queryByTestId } = renderComponent({error: <Error />})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).not.toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders NoData component when passed as props", () => {
    const { queryByTestId } = renderComponent({nodata: <NoData />})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).not.toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders Pagination component when passed as props", () => {
    const { queryByTestId } = renderComponent({pagination: <Pagination />})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).not.toBeNull()
    expect(queryByTestId("error-message")).toBeNull()
  })

  it("renders ErrorMessage component when passed as props", () => {
    const { queryByTestId } = renderComponent({errorMessage: <ErrorMessage />})
    expect(queryByTestId("nav")).toBeNull()
    expect(queryByTestId("search-box")).toBeNull()
    expect(queryByTestId("movie-card")).toBeNull()
    expect(queryByTestId("loader")).toBeNull()
    expect(queryByTestId("error")).toBeNull()
    expect(queryByTestId("nodata-component")).toBeNull()
    expect(queryByTestId("pagination")).toBeNull()
    expect(queryByTestId("error-message")).not.toBeNull()
  })


  it("matches snapshot", () => {
    const tree = renderer.create(<MemoryRouter><PageLayout/></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  })

})