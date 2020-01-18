import React from 'react';

const MovieCard = ({title, image, overview}) => {

  const truncate = (str) => str.length > 100 ? str.substring(0, 100) + "..." : str;

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
            <button className="btn mr-2"><i class="fa fa-star"></i></button>
            <button className="btn">Watch later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
