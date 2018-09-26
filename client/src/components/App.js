import React, { Component } from 'react';
import {
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import Home from './pages/Home';
import AddPic from './pages/AddPic';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.state = {
      pictures: [],
      pins: []
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // api.loadUser();
  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div>
        {/* Navbar reactstrap */}
        <Navbar className="Navbar" dark expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="sm-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/" exact>
                  {<img className="Logo" src="/maepic_w_transparent.png" alt="Logo" />}
                </NavLink>
              </NavItem>
              <NavItem>
                {/* {api.isLoggedIn() ? <NavLink className="nav-link" to="/add-picture">Add Picture</NavLink> : <NavLink to="/login">Add Picture</NavLink>} */}
                <NavLink className="nav-link" to="/add-picture">Add Picture</NavLink>
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink className="nav-link" to="/signup">Signup</NavLink>}
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink className="nav-link" to="/login">Login</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink className="nav-link" to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} />
          <Route path="/add-country" component={AddCountry} /> */}
          <Route path="/add-picture" component={AddPic} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
{/* <header className="App-header">
          <Link className="Home-link" to="/" exact ><img class="Logo" src="/maepic_logo_interim.png" alt="Logo" /></Link>
          {/* <Link to="/list-view">List view</Link> 
          {api.isLoggedIn() ? <Link to="/add-picture">Add Picture</Link> : <Link to="/login">Add Picture</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header> */}


export default App;
