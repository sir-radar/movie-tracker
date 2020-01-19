import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import SearchBox from '../SearchBox';
import MovieCard from '../MovieCard';
import { search } from '../../store/actions/searchActions';
import { getSessionID } from '../../store/actions/authActions';
import { addToFavorite, removeFromFavorite } from '../../store/actions/favouritesActions';

const SearchPage = ({ createSession, session_id, searchStatus, data, addToFavorite, removeFavorite, favoriteIDs, search  }) => {
  // const { createSession, session_id, searchStatus, data, addToFavorite, removeFavorite, favoriteIDs, search  } = props;
  
  useEffect(() => {
    createSession()
    console.log('useEffect')
  }, [session_id]);
  return (
    <main className="mt-4 p-3 col-8 offset-2">
      <SearchBox
        onSearch={ (title) => search(title) }
      />

      <div className="row justify-content-center">
        {
          (searchStatus === 'SUCCESS') ? data.results.map(result => <MovieCard
              key={result.id}
              id={result.id}
              title={result.title}
              image={result.poster_path}
              overview={result.overview}
              addToFavorite={addToFavorite}
              removeFavorite={removeFavorite}
              favoriteIDs={favoriteIDs}
             />) 
          
          : null
        }

        {
          (searchStatus === 'PENDING')
          ? <section className='loading'>
              <i className="fa fa-spinner fa-5x fa-spin"></i>
            </section>
          : null
        }
        
      </div>
      
    </main>
  );
}

const mapStateToProps = (state) => (
  {
    searchStatus: state.status.search,
    searchError: state.status.searchError,
    data: state.search,
    session_id: state.auth.session_id,
    favoriteIDs: state.favorites.favouriteMoviesID,
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    search: (title) => dispatch(search(title)),
    createSession: () => dispatch(getSessionID()),
    addToFavorite: (payload) => dispatch(addToFavorite(payload)),
    removeFavorite: (payload) => dispatch(removeFromFavorite(payload)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (SearchPage);
