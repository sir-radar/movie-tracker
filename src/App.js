import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
// import Nav from './components/Nav';
import SearchPage from './components/pages/SearchPage';
import Favourites from './components/pages/Favourites';
import WatchLater from './components/pages/WatchLater';
import Page404 from './components/pages/404Page';


function App() {
  return (
    <div className="App container-fluid">
      <Header/>
      
      <Router>
        {/* <Nav/>
        <main className="mt-4 p-3 col-8 offset-2"> */}
          <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route path="/favourites" component={Favourites} />
              <Route path="/watchlist" component={WatchLater} />
              <Route component={Page404} />
          </Switch>
        {/* </main> */}
      </Router>
    </div>
  )
  
}

export default App;
