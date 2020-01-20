import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../layout/PageLayout';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import { getAllFavourites, removeFromFavourite } from '../../store/actions/favouritesActions';
import { addToWatchList, removeFromWatchList } from '../../store/actions/watchListActions';

const Favourites = (props) => {
  const {
          favouriteMovies, 
          removeFavourite, 
          getAllFavourites, 
          favouriteIDs, 
          favouriteStatus, 
          watchlistIDs,  
          removeFromWatchList,
          addToWatchList
        } = props;

  //request for all favourites
  useEffect(() => {
    getAllFavourites()
  },[getAllFavourites]);

  return (
    <PageLayout
    
      showNav = {true}

      pageContent = {
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
            removeFromWatchList={removeFromWatchList}
            addToWatchList={addToWatchList}
          />) 
        
        : null
      }

      loader = {
        //display while request is pending
        (favouriteStatus === 'PENDING')
        ? <Loader/>
        : null
      }
      
      nodata = {
        //display if there is no favourite
        (favouriteStatus === 'SUCCESS' && favouriteMovies.results.length < 1)
        ? <NoData/>
        : null
      }

    />
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
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
    addToWatchList: (payload) => dispatch(addToWatchList(payload)),
    removeFromWatchList: (payload) => dispatch(removeFromWatchList(payload))
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (Favourites);
