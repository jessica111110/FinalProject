import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import { Route, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddPic from './pages/AddPic';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
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

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"></NavbarBrand>
          <Link to="/">Home</Link>
          <Link to="/list-view">List view</Link>
          {api.isLoggedIn() ? <Link to="/add-picture">Add Picture</Link> : <Link to="/login">Add Picture</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </Navbar>

        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} /> */}
          <Route path="/list-view" component={List} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/add-picture" component={AddPic} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
