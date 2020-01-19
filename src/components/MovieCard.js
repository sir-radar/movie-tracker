import React from 'react';

const MovieCard = ({id, title, image, overview,addToFavorite, removeFavorite, favoriteIDs}) => {

  const truncate = (str) => str.length > 100 ? str.substring(0, 100) + "..." : str;

  const makeFavourite = (e) =>{
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": true
    };
    e.preventDefault()
    addToFavorite(data)
  }

  const removeFavourite = () => {
    const data = {
      "media_type": "movie",
      "media_id": id,
      "favorite": false
    };
    removeFavorite(data)
  }

  return (
    <div className="card card-height p-0 col-12 col-md-5 m-2">
      <img src={image ? `https://image.tmdb.org/t/p/w200/${image}` : 'no-image.png'} className="card-img-top image-size" alt="..."/>
      <div className="d-flex flex-column justify-content-end card-body">
        <h5 className="card-title">{title}</h5>
        <div>
          <p className="card-text">{truncate(overview)}</p>
        </div>
        <div className="align-self-center actions">
          <a href="#" className="btn btn-primary">Go somewhere</a>
          <div className="d-flex">
            {
              favoriteIDs.includes(id) ? <button onClick={removeFavourite} className="btn mr-2"><i className="fa fa-star text-favourite"></i></button>
                : <button onClick={makeFavourite} className="btn mr-2"><i className="fa fa-star"></i></button>
            }
            
            <button className="btn">Watch later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
