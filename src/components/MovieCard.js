import React from 'react';

const MovieCard = ({id, title, image, overview, addToFavourite , removeFavourite, favouriteIDs}) => {

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

  return (
    <div className="card card-height p-0 col-12 col-md-5 my-2 mx-4">
      <img src={image ? `https://image.tmdb.org/t/p/w500/${image}` : 'no-image.png'} className="card-img-top image-size" alt="..."/>
      <div className="d-flex flex-column justify-content-end card-body">
        <h5 className="card-title">{title}</h5>
        <div>
          <p className="card-text">{truncate(overview)}</p>
        </div>
        <div className="align-self-center actions">
          <a href="#" className="btn btn-primary">Go somewhere</a>
          <div className="d-flex">
            {
              favouriteIDs.includes(id) ? <button onClick={removeFromFavouritesHandler} className="btn mr-2"><i className="fa fa-star text-favourite"></i></button>
                : <button onClick={makeFavouriteHandler} className="btn mr-2"><i className="fa fa-star"></i></button>
            }
            
            <button className="btn">Watch later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
