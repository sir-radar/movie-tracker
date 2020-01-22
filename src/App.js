import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header/Header';
import SearchPage from './components/pages/SearchPage/SearchPage';
import Favourites from './components/pages/Favourites/Favourites';
import WatchLater from './components/pages/WatchLater/WatchLater';
import Page404 from './components/pages/404Page/404Page';
import MovieDetails from './components/pages/MovieDetails/MovieDetails';


function App() {
 
  return (
    <div className="App container-fluid">
      
      <Router>
        <Header/>
          <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route path="/favourites" component={Favourites} />
              <Route path="/watchlist" component={WatchLater} />
              <Route path="/movie/:id" component={MovieDetails} />
              <Route component={Page404} />
          </Switch>
      </Router>

    </div>
  )
}
export default App;
