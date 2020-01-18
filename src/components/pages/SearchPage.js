import React from 'react';
import { connect } from 'react-redux';
import SearchBox from '../SearchBox';
import MovieCard from '../MovieCard';

const SearchPage = () => {
  return (
    <main className="mt-4 p-3 col-8 offset-2">
      <SearchBox/>

      <div className="row justify-content-center">
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
      </div>
      
    </main>
  );
}

export default SearchPage;
