import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../layout/PageLayout';
import MovieCard from '../../MovieCard/MovieCard';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import Error from '../../Error/Error';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Pagination from '../../Pagination/Pagination';
import { getAllFavourites, removeFromFavourite } from '../../../store/actions/favouritesActions';
import { addToWatchList, removeFromWatchList } from '../../../store/actions/watchListActions';
import { resetStatus } from '../../../store/actions/statusActions';

const Favourites = (props) => {
  const {
          favouriteMovies, 
          removeFavourite, 
          getAllFavourites, 
          favouriteStatus, 
          removeFromWatchList,
          addToWatchList,
          watchlistActionStatus,
          favouriteActionStatus,
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
        (watchlistActionStatus === 'ERROR' || favouriteActionStatus === 'ERROR' )
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
    favouriteMovies: state.favourites.favouriteMovies,
    watchlistActionStatus: state.status.watchlistAction,
    favouriteActionStatus: state.status.favouriteAction
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
