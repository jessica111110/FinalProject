import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';
// import Countries from './pages/Countries';
import AddPic from './pages/AddPic';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: [],
      pins: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Map</h1>
          <Link to="/">Home</Link>
          <Link to="/list-view">List view</Link>
          {api.isLoggedIn() ? <Link to="/add-picture">Add Picture</Link> : <Link to="/">Add Picture</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <Link to="/secret">Secret</Link>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} />
          <Route path="/add-country" component={AddCountry} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/add-picture" component={AddPic} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
