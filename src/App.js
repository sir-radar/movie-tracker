import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Headers from './components/Header';
import Nav from './components/Nav';
import SearchPage from './components/pages/SearchPage';
import Favourites from './components/pages/Favourites';
import WatchLater from './components/pages/WatchLater';


function App() {
  return (
    <div className="App container-fluid">
    {/* <Headers></Headers> */}
      <header className="row bg-header p-3 text-light font-weight-bolder">
        Movie Tracker
      </header>
      <Router>
        <Nav/>
        <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/watchlist" component={WatchLater} />
        </Switch>
      </Router>
    </div>
  )
  
}

export default App;
