import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { animateScroll } from "react-scroll";
import Nav from '../../Nav/Nav';
import Loader from '../../Loader/Loader';
import MoviePoster from '../../MoviePoster/MoviePoster';
import { getMovieDetails } from '../../../store/actions/movieActions';

const MovieDetails = ({movieStatus, match, getMovieDetails, movieDetails }) => {

  useEffect(() => {
    getMovieDetails(match.params.id)
  },[getMovieDetails, match.params.id]);

  const [showTrialer, setShowTrailer] = useState(false);

  const displayTrailer = (e) =>{
    e.preventDefault();
    setShowTrailer(true)
    //scrolls to the bottom of page to show trailer
    animateScroll.scrollToBottom()
  }

  //youtube options
  const opts = {
    height: '390',
    width: '450',
    playerVars: {
      autoplay: 1
    }
  };

  return (
    <>
      <Nav/>
      <main data-testid="movie-details-page" className="mt-4 p-3 col-10 col-md-10 offset-0 offset-md-1">
        <div className="row">

          {
            (movieStatus === "PENDING") ? <Loader/> : null
          }

          {
            (movieStatus === "SUCCESS") ? <MoviePoster image={movieDetails.poster_path}/> : null
          }


          {
            (movieStatus === "SUCCESS") ? 
              <div className="col-12 col-md-8 mb">
                <div className="col-12">
                  <h2>{movieDetails.title}</h2>
                  <p><span>Genres:</span> <span>{ movieDetails.genres.map(genre => genre.name) }</span></p>
                  <p><span>Average vote:</span> <span>{movieDetails.vote_average}</span></p>
                  <p><span>Language(s):</span><span>{movieDetails.spoken_languages.map(lang => lang.name)}</span></p>
                  <p>{movieDetails.overview}</p>
                  <p><span>Realease:</span><span>{movieDetails.release_date}</span></p>
                  <p><span>Duration:</span><span>{movieDetails.runtime} minutes</span></p>

                  {
                    (!showTrialer && movieDetails.videos.results.length > 0) ? 
                          <button onClick={(e) => displayTrailer(e)} className="btn btn-primary">Watch Trailer</button>
                          : null
                  }
                  
                </div>
              </div>

            : null
          }
        </div>
        <div className="col-12 col-md-6 mt-4 mx-0 mx-md-auto">
            {
              (showTrialer) ? <YouTube
                                videoId={movieDetails.videos.results[0].key}
                                opts={opts}
                          />
                : null
            }
        </div>
      </main>
    </>
  );
}

const mapStateToProps = (state) => (
  {
    movieStatus: state.status.movieDetailsAction,
    movieDetails: state.movie,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    getMovieDetails: (movieId) => dispatch(getMovieDetails(movieId)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (MovieDetails);
