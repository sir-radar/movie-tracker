import React,{useState} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../layout/PageLayout';
import SearchBox from '../../SearchBox/SearchBox';
import MovieCard from '../../MovieCard/MovieCard';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import Error from '../../Error/Error';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Pagination from '../../Pagination/Pagination';
import { search } from '../../../store/actions/searchActions';
import { addToFavourite, removeFromFavourite } from '../../../store/actions/favouritesActions';
import { addToWatchList, removeFromWatchList } from '../../../store/actions/watchListActions';
import { resetStatus } from '../../../store/actions/statusActions';

const SearchPage = (props) => {

  const { searchStatus, 
          movies, 
          addToFavourite, 
          removeFavourite, 
          favouriteIDs, 
          search,
          removeFromWatchList,
          addToWatchList,
          watchlistIDs,
          watchlistAction,
          favouriteAction,
          resetStatus
        } = props;

  const [searchQuery, setSearchQuery] = useState('')
  console.log(watchlistAction)
  //gets searchquery for pagination
  const updateSerachQuery = (value) => {
    setSearchQuery(value)
  }

  const loadMore = (page) =>{
    search(searchQuery, page)
  }

  return (
        
        <PageLayout

          showNav = {true}

          searchbox = {
            <SearchBox
              onSearch={ (title) => search(title) }
              updateSerachQuery={(query) => updateSerachQuery(query)}
            />
          }

          pageContent = {
            //display on successful request
            (searchStatus === 'SUCCESS') ? movies.results.map(result => <MovieCard
                key={result.id}
                id={result.id}
                title={result.title}
                image={result.poster_path}
                overview={result.overview}
                addToFavourite={addToFavourite}
                removeFavourite={removeFavourite}
                favouriteIDs={favouriteIDs}
                removeFromWatchList={removeFromWatchList}
                addToWatchList={addToWatchList}
                watchlistIDs={watchlistIDs}
              />) 
            
            : null
          }

          loader = {
            //display while request is pending
            (searchStatus === 'PENDING')
            ? <Loader/>
            : null
          }

          error = {
            //display when an error occurs
            (searchStatus === 'ERROR')
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
            //display if there is no result
            (searchStatus === 'SUCCESS' && movies.results.length < 1)
            ? <NoData/>
            : null
          }

          pagination = {
            //pagination
            (searchStatus === 'SUCCESS') ? movies.total_results > 20 ? <Pagination 
                                          searchMore={ (page) => loadMore(page) }
                                          page={movies.page} 
                                          pages={movies.total_pages}
                                          /> 
                    : ''
                    : ''
          }
          
        />
  );
}

const mapStateToProps = (state) => (
  {
    searchStatus: state.status.search,
    watchlistAction: state.status.watchlistAction,
    favouriteAction: state.status.favouriteAction,
    movies: state.search,
    favouriteIDs: state.favourites.favouriteMoviesID,
    watchlistIDs: state.watchlists.watchListsID,
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    search: (title, page) => dispatch(search(title, page)),
    addToFavourite: (payload) => dispatch(addToFavourite(payload)),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
    addToWatchList: (payload) => dispatch(addToWatchList(payload)),
    removeFromWatchList: (payload) => dispatch(removeFromWatchList(payload)),
    resetStatus: () => dispatch(resetStatus()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (SearchPage);
