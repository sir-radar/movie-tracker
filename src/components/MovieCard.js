import React from 'react';

const MovieCard = (props) => {
  const { id,
          title, 
          image, 
          overview, 
          addToFavourite, 
          removeFavourite, 
          favouriteIDs,
          removeFromWatchList,
          addToWatchList,
          watchlistIDs
        } = props
  //Limits movie overview to 100 words
  const truncate = (str) => str.length > 100 ? str.substring(0, 100) + "..." : str;

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
    <div className="card card-height p-0 col-12 col-md-5 my-2 mx-md-4">
      <img src={image ? `https://image.tmdb.org/t/p/w500/${image}` : 'no-image.png'} className="card-img-top image-size" alt="..."/>
      <div className="d-flex flex-column justify-content-end card-body">
        <h5 className="card-title">{title}</h5>
        <div>
          <p className="card-text">{truncate(overview)}</p>
        </div>
        <div className="align-self-center actions">
          <a href="#" className="btn btn-primary">Go somewhere</a>
          <div className="d-flex mt-2">
            {
              favouriteIDs.includes(id) ? <button onClick={removeFromFavouritesHandler} className="btn mr-2"><i className="fa fa-star text-favourite"></i></button>
                : <button onClick={makeFavouriteHandler} className="btn mr-2"><i className="fa fa-star"></i></button>
            }
            {
              watchlistIDs.includes(id) ? <button onClick={removeFromWatchListHandler} className="btn rm-btn-bg">Remove</button>
                : <button onClick={addToWatchListHandler} className="btn">Watch later</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
