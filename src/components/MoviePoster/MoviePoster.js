import React from 'react';

const MoviePoster = ({image}) => {
  return (
    <div className="col-12 col-md-4">
      <div className="col-12">
        <img 
          className="h-25 w-100" 
          src={ image ? `https://image.tmdb.org/t/p/w500${image}` : '/no-image.png'} alt="..."/>
      </div>
    </div>
  );
}

export default MoviePoster;
