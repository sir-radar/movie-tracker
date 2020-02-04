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
          getMovieState,
          favouriteAction,
          watchlistAction
        } = props

  const [movieState, setMovieState] = useState({})

  useEffect(() => {
    //checks if movie is a favourite or on the watchlist
    async function movieStateRequest(){
      const response = await getMovieState(id)
      setMovieState(response.data)
    }
  
    movieStateRequest()
    
  }, [getMovieState, id]);

  //Limits text to the length given
  const truncate = (str, length) => str.length > length ? str.substring(0, length) + "..." : str;

  const makeFavouriteHandler = async (e) =>{
    e.preventDefault()
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": true
    };
    await addToFavourite(data)
    if(favouriteAction !== 'ERROR'){
      setMovieState((prevSate) => ({...prevSate, favorite:true}))
    }
  }

  const removeFromFavouritesHandler = (e) => {
    e.preventDefault()
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": false
    };
    removeFavourite(data)
    if(favouriteAction !== 'ERROR'){
      setMovieState((prevSate) => ({...prevSate, favorite:false}))
    }
  }

  const addToWatchListHandler = async (e) => {
    e.preventDefault()
    const data = {
      "media_type": "movie",
      "media_id": id,
      "watchlist": true
    };
    await addToWatchList(data)
    if(watchlistAction !== 'ERROR'){
      setMovieState((prevSate) => ({...prevSate, watchlist:true}))
    }
  }

  const removeFromWatchListHandler = (e) => {
    e.preventDefault()
    const data = {
      "media_type": "movie",
      "media_id": id,
      "watchlist": false
    };
    removeFromWatchList(data)
    if(watchlistAction !== 'ERROR'){
      setMovieState((prevSate) => ({...prevSate, watchlist:false}))
    }
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

const mapStateToProps = (state) => (
  {
    favouriteAction: state.status.favouriteAction,
    watchlistAction: state.status.watchlistAction
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    getMovieState: (movieId) => dispatch(getMovieState(movieId)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (MovieCard);
