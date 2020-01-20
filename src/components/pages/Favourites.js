import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import { getAllFavourites, removeFromFavourite } from '../../store/actions/favouritesActions';

const Favourites = ({favouriteMovies, removeFavourite, getAllFavourites, favouriteIDs, favouriteStatus, watchlistIDs}) => {
  //request for all favourites
  useEffect(() => {
    getAllFavourites()
  },[getAllFavourites]);

  return (
    <div className="row px-5">
      {
        //display on successful request
        (favouriteStatus === 'SUCCESS') ? favouriteMovies.results.map(result => <MovieCard
            key={result.id}
            id={result.id}
            title={result.title}
            image={result.poster_path}
            overview={result.overview}
            removeFavourite={removeFavourite}
            favouriteIDs={favouriteIDs}
            watchlistIDs={watchlistIDs}
          />) 
        
        : null
      }

      {
        //display while request is pending
        (favouriteStatus === 'PENDING')
        ? <Loader/>
        : null
      }
      
      {
        //display if there is no favourite
        (favouriteStatus === 'SUCCESS' && favouriteMovies.results.length < 1)
        ? <NoData/>
        : null
      }

  
    
    </div>
  );
}

const mapStateToProps = (state) => (
  {
    favouriteStatus: state.status.favourite,
    favouriteError: state.status.favouriteError,
    favouriteMovies: state.favourites.favouriteMovies,
    favouriteIDs: state.favourites.favouriteMoviesID,
    watchlistIDs: state.watchlists.watchListsID,
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    getAllFavourites: () => dispatch(getAllFavourites()),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload))
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (Favourites);
