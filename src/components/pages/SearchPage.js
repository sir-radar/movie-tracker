import React,{useState} from 'react';
import { connect } from 'react-redux';
import PageLayout from '../layout/PageLayout';
import SearchBox from '../SearchBox';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import Pagination from '../Paginattion';
import { search } from '../../store/actions/searchActions';
import { addToFavourite, removeFromFavourite } from '../../store/actions/favouritesActions';
import { addToWatchList, removeFromWatchList } from '../../store/actions/watchListActions';

const SearchPage = (props) => {

  const { searchStatus, 
          movies, 
          addToFavourite, 
          removeFavourite, 
          favouriteIDs, 
          search,
          removeFromWatchList,
          addToWatchList,
          watchlistIDs 
        } = props;

  const [searchQuery, setSearchQuery] = useState('')
  
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

          nodata = {
            //display if there is no result
            (searchStatus === 'SUCCESS' && movies.results.length < 1)
            ? <NoData/>
            : null
          }

          pagination = {
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
    searchError: state.status.searchError,
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
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (SearchPage);
