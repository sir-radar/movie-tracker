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
  // console.log(props)
  const { searchStatus, 
          movies, 
          addToFavourite, 
          removeFavourite, 
          search,
          removeFromWatchList,
          addToWatchList,
          watchlistActionStatus,
          favouriteActionStatus,
          resetStatus
        } = props;

  const [searchQuery, setSearchQuery] = useState('');

  //gets searchquery for pagination
  const updateSerachQuery = (value) => {
    setSearchQuery(value);
  }

  //makes request for nex or previos page data
  const loadMore = (page) => {
    search(searchQuery, page);
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
                removeFromWatchList={removeFromWatchList}
                addToWatchList={addToWatchList}
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
            (watchlistActionStatus === 'ERROR' || favouriteActionStatus === 'ERROR' )
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
    watchlistActionStatus: state.status.watchlistAction,
    favouriteActionStatus: state.status.favouriteAction,
    movies: state.search
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
