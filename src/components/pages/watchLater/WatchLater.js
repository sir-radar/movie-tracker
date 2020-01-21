import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../layout/PageLayout';
import MovieCard from '../../MovieCard/MovieCard';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import Error from '../../Error/Error';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Pagination from '../../Pagination/Pagination';
import { getAllWatchLists, removeFromWatchList } from '../../../store/actions/watchListActions';
import { addToFavourite, removeFromFavourite } from '../../../store/actions/favouritesActions';
import { resetStatus } from '../../../store/actions/statusActions';

const WatchLater = (props) => {

  const { watchlists,
          removeFromWatchList, 
          getAllWatchLists, 
          watchlistIDs, 
          watchlistStatus,
          removeFavourite,
          addToFavourite,
          favouriteIDs,
          watchlistAction,
          favouriteAction,
          resetStatus
        } = props

   //request for all watchlists
  useEffect(() => {
    getAllWatchLists()
  },[getAllWatchLists]);

  return (
    <PageLayout

      showNav = {true}
      
      pageContent ={ 
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

      loader = {
        //display while request is pending
        (watchlistStatus === 'PENDING')
        ? <Loader/>
        : null
      }

      error = {
        //display when an error occurs
        (watchlistStatus === 'ERROR')
        ? <Error/>
        : null
      }

      errorMessage = {
        //display when an error occurs in favouriting or adding movie to watchlist
        (watchlistAction === 'ERROR' || favouriteAction === 'ERROR' )
        ? <ErrorMessage resetStatus={resetStatus}/>
        : ''
      }
      
      nodata = {
        //display if there is no favourite
        (watchlistStatus === 'SUCCESS' && watchlists.results.length < 1)
        ? <NoData/>
        : null
      }

      pagination = {
        //pagination
        watchlistStatus === 'SUCCESS' ? watchlists.total_results > 20 ? <Pagination 
                                      searchMore={(page) => getAllWatchLists(page)}
                                      page={watchlists.page} 
                                      pages={watchlists.total_pages}
                                      /> 
                : ''
                : ''
      }

    />
  );
}

const mapStateToProps = (state) => (
  {
    watchlistStatus: state.status.watchlist,
    favouriteError: state.status.watchlistError,
    watchlists: state.watchlists.watchLists,
    watchlistIDs: state.watchlists.watchListsID,
    favouriteIDs: state.favourites.favouriteMoviesID,
    watchlistAction: state.status.watchlistAction,
    favouriteAction: state.status.favouriteAction
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    getAllWatchLists: (page) => dispatch(getAllWatchLists(page)),
    removeFromWatchList: (payload) => dispatch(removeFromWatchList(payload)),
    addToFavourite: (payload) => dispatch(addToFavourite(payload)),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
    resetStatus: () => dispatch(resetStatus()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (WatchLater);
