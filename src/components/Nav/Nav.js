import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {

  useEffect(() => {
    handlePathChange(window.location.pathname)
  },[]);

  const [pathname, setPathname] = useState('/');

  const handlePathChange = (val) => {
    setPathname(val)
  }

  return (
    <nav className="d-flex justify-content-center">
      <Link 
        data-testid="search"
        to='/'
        onClick={ () => handlePathChange('/')}
        className={ pathname === '/' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >Search
      </Link>
      <Link
        data-testid="favourite"
        to='/favourites'
        onClick={ () => handlePathChange('/favourites')}
        className={ pathname === '/favourites' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >Favorites
      </Link>
      <Link
        data-testid="watchlater"
        to='/watchlist'
        onClick={ () => handlePathChange('/watchlist')}
        className={ pathname === '/watchlist' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >WatchLater
      </Link>
    </nav>
  );
}

export default Nav;
