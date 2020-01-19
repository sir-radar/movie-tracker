import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import SearchBox from '../SearchBox';
import MovieCard from '../MovieCard';
import Loader from '../Loader';
import NoData from '../NoData';
import { search } from '../../store/actions/searchActions';
import { getSessionID } from '../../store/actions/authActions';
import { addToFavourite, removeFromFavourite } from '../../store/actions/favouritesActions';

const SearchPage = (props) => {
  const { createSession, session_id, searchStatus, movies, addToFavourite, removeFavourite, favouriteIDs, search } = props;

  //create session_id if it doesn't exist
  useEffect(() => {
    if(!session_id){
      createSession()
    }
  }, [createSession, session_id]);

  return (
      <>
        <SearchBox
          onSearch={ (title) => search(title) }
        />

        <div className="row px-5">

          {
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
              />) 
            
            : null
          }

          {
            //display while request is pending
            (searchStatus === 'PENDING')
            ? <Loader/>
            : null
          }

          {
            //display if there is no result
            (searchStatus === 'SUCCESS' && movies.results.length < 1)
            ? <NoData/>
            : null
          }
          
        </div>
      </>
  );
}

const mapStateToProps = (state) => (
  {
    searchStatus: state.status.search,
    searchError: state.status.searchError,
    movies: state.search,
    session_id: state.auth.session_id,
    favouriteIDs: state.favourites.favouriteMoviesID,
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    search: (title) => dispatch(search(title)),
    createSession: () => dispatch(getSessionID()),
    addToFavourite: (payload) => dispatch(addToFavourite(payload)),
    removeFavourite: (payload) => dispatch(removeFromFavourite(payload)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (SearchPage);
