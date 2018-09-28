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
  NavbarBrand,
  NavItem,
  Tooltip
} from 'reactstrap';
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
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleClickOnNavIcon = this.handleClickOnNavIcon.bind(this);
    this.state = {
      collapsed: true,
      isOpen: false,
      tooltipOpen: false,
      pictures: [],
      pins: [],
      mapDisplayed: true,
    }
  }

  // api.loadUser();
  handleLogoutClick(e) {
    api.logout()
  }

  handleClickOnNavIcon(e) {
    this.setState({
      mapDisplayed: !this.state.mapDisplayed
    })
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (

      <div>
        console.log({<img className="img-list" src="/list_w.psd" alt="List" />})
        {/* Navbar reactstrap */}
        <Navbar className="Navbar" dark expand fixed={`top`}>
          <NavbarBrand href="/" exact>
            {<img className="img-logo" src="/maepic_w_transparent.png" alt="Logo" />}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Nav className="ml-auto" navbar>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="sm-auto" navbar>
                {this.state.mapDisplayed && <NavItem className="d-flex align-items-center"><NavLink className="nav-link" to="/list-view">
                  {<img onClick={(e) => this.handleClickOnNavIcon(e)} className="img-list" src="/list_w.png" alt="List" />}
                </NavLink></NavItem>}
                {!this.state.mapDisplayed && <NavItem className="d-flex align-items-center"><NavLink className="nav-link" exact to="/">
                  {<img onClick={(e) => this.handleClickOnNavIcon(e)} className="img-list" src="/globe_w.png" alt="Map" />}
                </NavLink></NavItem>}
                <NavItem className="d-flex align-items-center">

                  {/* {api.isLoggedIn() ? <NavLink className="nav-link" to="/add-picture">Add Picture</NavLink> : <NavLink to="/login">Add Picture</NavLink>} */}<NavLink className="nav-link" to="/add-picture" href="#" id="TooltipExample">{<img className="img-cam" src="/camera_w.png" alt="Add Pic" />}</NavLink>
                  {!api.isLoggedIn() && <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>Please log in first</Tooltip>}

                </NavItem>
                <NavItem className="d-flex align-items-center">{!api.isLoggedIn() && <NavLink className="nav-link" to="/signup">Signup</NavLink>}</NavItem>
                <NavItem className="d-flex align-items-center">{!api.isLoggedIn() && <NavLink className="nav-link" to="/login">Login</NavLink>}</NavItem>
                <NavItem className="d-flex align-items-center">{api.isLoggedIn() && <NavLink className="nav-link" to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}</NavItem>
              </Nav>
            </Collapse>
          </Nav>
        </Navbar>
        Name < div>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/countries" component={Countries} /> */}
            <Route path="/list-view" component={List} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/edit-picture/:id" component={EditPic} />
            <Route path="/add-picture" component={AddPic} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div >
      </div >
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
