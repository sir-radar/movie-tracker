import React from 'react';
import { connect } from 'react-redux';
import SearchBox from '../SearchBox';
import MovieCard from '../MovieCard';
import { search } from '../../store/actions/searchActions';

const SearchPage = (props) => (
    <main className="mt-4 p-3 col-8 offset-2">
      <SearchBox
        onSearch={ (title) => props.search(title) }
      />

      <div className="row justify-content-center">
        {
          // console.log(props.data.page)
          (props.searchStatus === 'SUCCESS') ? props.data.results.map(result => <MovieCard
              key={result.id}
              title={result.title}
              image={result.poster_path}
              overview={result.overview}
             />) 
          
          : null
        }

        {
          (props.searchStatus === 'PENDING')
          ? <section className='loading'>
              <i className="fa fa-spinner fa-5x fa-spin"></i>
            </section>
          : null
        }
        
      </div>
      
    </main>
);

const mapStateToProps = (state) => (
  {
    searchStatus: state.status.search,
    searchError: state.status.searchError,
    data: state.search,
    // favoriteInfo: state.favorites[state.search.imdbID],
  }
);
  
const mapDispatchToProps = (dispatch) => (
  {
    search(title) {
      dispatch(search(title))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (SearchPage);
