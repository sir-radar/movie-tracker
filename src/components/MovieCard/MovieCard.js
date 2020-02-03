import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getMovieState } from '../../store/actions/movieStateAction';

const MovieCard = (props) => {

  const { id,
          title, 
          image, 
          overview, 
          addToFavourite, 
          removeFavourite, 
          removeFromWatchList,
          addToWatchList,
          getMovieState
        } = props

  const [movieState, setMovieState] = useState({})
//  let movieState = {};

  useEffect(() => {
    //prevents memory leaks and prevents settings state for unrendered component
    let mounted = true;

    async function movieStateRequest(){
      const response = await getMovieState(id)
      if(mounted){
        setMovieState(response.data)
      }
    }
    movieStateRequest()

    return () => mounted = false;
    
  });

  //Limits text to the length
  const truncate = (str, length) => str.length > length ? str.substring(0, length) + "..." : str;

  const makeFavouriteHandler = (e) =>{
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": true
    };
    e.preventDefault()
    addToFavourite(data)
  }

  const removeFromFavouritesHandler = () => {
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": false
    };
    removeFavourite(data)
  }

  const addToWatchListHandler = () => {
    const data = {
      "media_type": "movie",
      "media_id": id,
      "watchlist": true
    };
    addToWatchList(data)
  }

  const removeFromWatchListHandler = () => {
    const data = {
      "media_type": "movie",
      "media_id": id,
      "watchlist": false
    };
    removeFromWatchList(data)
  }

  return (
    <div data-testid="movie-card" className="col-md-3 mt-2">
      <div className="card card-height p-0 col-12">
        <img src={image ? `https://image.tmdb.org/t/p/w500/${image}` : '/no-image.png'} className="card-img-top image-size mb-2" alt="..."/>
        <div className="d-flex flex-column justify-content-between card-body p-2">
          <h5 data-testid="movie-title" className="card-title">{truncate(title, 30)}</h5>
          <div>
            <p data-testid="movie-overview" className="card-text">{truncate(overview, 70)}</p>
          </div>
          <div className="align-self-center actions text-center">
            <Link data-testid="movie-details-link" to={`movie/${id}`}>See Details</Link>
            <div className="d-flex mt-2">
              {
                movieState.favorite ? <button data-testid="active-favourite" onClick={removeFromFavouritesHandler} className="btn mr-2"><i className="fa fa-star text-favourite"></i></button>
                  : <button data-testid="inactive-favourite" onClick={makeFavouriteHandler} className="btn mr-2"><i className="fa fa-star"></i></button>
              }
              {
                movieState.watchlist ? <button data-testid="active-watchlist" onClick={removeFromWatchListHandler} className="btn rm-btn-bg">Remove</button>
                  : <button data-testid="inactive-watchlist" onClick={addToWatchListHandler} className="btn">Watch later</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => (
  {
    getMovieState: (movieId) => dispatch(getMovieState(movieId)),
  }
)

export default connect(null, mapDispatchToProps) (MovieCard);
