import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="row bg-header p-3 text-light font-weight-bolder">
      <Link 
        to='/'
        className="text-white"
      > Movie Tracker
      </Link>
    </header>
  );
}

export default Header;
