import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../layout/PageLayout';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import Error from '../Error';
import ErrorMessage from '../ErrorMessage';
import Pagination from '../Pagination';
import { getAllFavourites, removeFromFavourite } from '../../store/actions/favouritesActions';
import { addToWatchList, removeFromWatchList } from '../../store/actions/watchListActions';
import { resetStatus } from '../../store/actions/statusActions';

const Favourites = (props) => {
  const {
          favouriteMovies, 
          removeFavourite, 
          getAllFavourites, 
          favouriteIDs, 
          favouriteStatus, 
          watchlistIDs,  
          removeFromWatchList,
          addToWatchList,
          watchlistAction,
          favouriteAction,
          resetStatus
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

      error = {
        //display when an error occurs
        (favouriteStatus === 'ERROR')
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
        (favouriteStatus === 'SUCCESS' && favouriteMovies.results.length < 1)
        ? <NoData/>
        : null
      }

      pagination = {
        //pagination
        favouriteStatus === 'SUCCESS' ? favouriteMovies.total_results > 20 ? <Pagination 
                                      searchMore={(page) => getAllFavourites(page)}
                                      page={favouriteMovies.page} 
                                      pages={favouriteMovies.total_pages}
                                      /> 
                : ''
                : ''
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
    watchlistAction: state.status.watchlistAction,
    favouriteAction: state.status.favouriteAction
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    getAllFavourites: (page) => dispatch(getAllFavourites(page)),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
    addToWatchList: (payload) => dispatch(addToWatchList(payload)),
    removeFromWatchList: (payload) => dispatch(removeFromWatchList(payload)),
    resetStatus: () => dispatch(resetStatus())
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (Favourites);
