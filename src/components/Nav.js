import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {

  const [pathname, setPathname] = useState('/');
  console.log(pathname)
  return (
    <nav className="d-flex justify-content-center">
      <Link 
        to='/'
        onClick={ () => setPathname('/')}
        className={ pathname === '/' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >Search
      </Link>
      <Link
        to='/favourites'
        onClick={ () => setPathname('/favourites')}
        className={ pathname === '/favourites' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >Favorites
      </Link>
      <Link 
        to='/watchlist'
        onClick={ () => setPathname('/watchlist')}
        className={ pathname === '/watchlist' ? 'p-3 primary-text-color active' : 'p-3 primary-text-color' }
      >WatchLater
      </Link>
    </nav>
  );
}

export default Nav;
