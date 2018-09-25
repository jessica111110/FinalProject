import React, { Component } from 'react';
import {

  Route, Link, Switch
} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddPic from './pages/AddPic';
import EditPic from './pages/EditPic';
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
        <header className="App-header">
          <h1 className="App-title">maepic</h1>
          <Link to="/" exact >Home</Link>
          <Link to="/list-view">List view</Link>
          {api.isLoggedIn() ? <Link to="/add-picture">Add Picture</Link> : <Link to="/login">Add Picture</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}

        </header>


        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} /> */}
          <Route path="/list-view" component={List} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/edit-picture" component={EditPic} />
          <Route path="/add-picture" component={AddPic} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
