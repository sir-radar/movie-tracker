import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import { getAllWatchLists, removeFromWatchList } from '../../store/actions/watchListActions';
import { addToFavourite, removeFromFavourite } from '../../store/actions/favouritesActions';

const WatchLater = (props) => {

  const { watchlists,
          removeFromWatchList, 
          getAllWatchLists, 
          watchlistIDs, 
          watchlistStatus,
          removeFavourite,
          addToFavourite,
          favouriteIDs
        } = props

   //request for all watchlists
  useEffect(() => {
    getAllWatchLists()
  },[getAllWatchLists]);

  return (
    <div className="row px-5">
      {
        //display on successful request
        (watchlistStatus === 'SUCCESS') ? watchlists.results.map(result => <MovieCard
            key={result.id}
            id={result.id}
            title={result.title}
            image={result.poster_path}
            overview={result.overview}
            removeFromWatchList={removeFromWatchList}
            addToFavourite={addToFavourite}
            removeFavourite={removeFavourite}
            favouriteIDs={favouriteIDs}
            watchlistIDs={watchlistIDs}
          />) 
        
        : null
      }

      {
        //display while request is pending
        (watchlistStatus === 'PENDING')
        ? <Loader/>
        : null
      }
      
      {
        //display if there is no favourite
        (watchlistStatus === 'SUCCESS' && watchlists.results.length < 1)
        ? <NoData/>
        : null
      }

  
    
    </div>
  );
}

const mapStateToProps = (state) => (
  {
    watchlistStatus: state.status.watchlist,
    favouriteError: state.status.watchlistError,
    watchlists: state.watchlists.watchLists,
    watchlistIDs: state.watchlists.watchListsID,
    favouriteIDs: state.favourites.favouriteMoviesID,
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    getAllWatchLists: () => dispatch(getAllWatchLists()),
    removeFromWatchList: (payload) => dispatch(removeFromWatchList(payload)),
    addToFavourite: (payload) => dispatch(addToFavourite(payload)),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (WatchLater);
