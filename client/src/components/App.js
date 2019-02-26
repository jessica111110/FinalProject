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
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import api from '../api';
import './App.css';
import NavIcons from '../../src/sprite.svg'
import ListLogo from "./../images/list_new_w.png"
import MapLogo from "./../images/globe_w.png"
import NavLogo from "./../images/maepic_w_transparent.png"
import CreateLogo from "./../images/camera_w.png"



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
        console.log({<img className="img-list" src="../images/list_w.psd" alt="List" />})
        {/* Navbar reactstrap */}
        <Navbar className="Navbar" dark expand fixed={`top`}>
          <NavbarBrand href="/" exact>
            {<img className="img-logo" src={NavLogo} alt="Logo" />}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Nav className="ml-auto" navbar>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="sm-auto" navbar>

                {this.state.mapDisplayed && <NavItem className="d-flex align-items-center"><NavLink className="nav-link" to="/list-view">
                  {<img onClick={(e) => this.handleClickOnNavIcon(e)} className="img-list" src={ListLogo} alt="List" />}
                </NavLink></NavItem>}

                {!this.state.mapDisplayed && <NavItem className="d-flex align-items-center"><NavLink className="nav-link" exact to="/">
                  {<img onClick={(e) => this.handleClickOnNavIcon(e)} className="img-list" src={MapLogo} alt="Map" style={{ width: '30px' }} />}
                </NavLink></NavItem>}

                <NavItem className="d-flex align-items-center">
                  {/* {api.isLoggedIn() ? <NavLink className="nav-link" to="/add-picture">Add Picture</NavLink> : <NavLink to="/login">Add Picture</NavLink>} */}<NavLink className="nav-link" to="/add-picture" href="#" id="TooltipExample">{<img className="img-cam" src={CreateLogo} alt="Add Pic" />}</NavLink>
                  {!api.isLoggedIn() && <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>Please log in first</Tooltip>}
                </NavItem>

                <NavItem className="d-flex align-items-center">{!api.isLoggedIn() && <NavLink className="nav-link" to="/signup">Signup</NavLink>}</NavItem>

                <NavItem className="d-flex align-items-center">{!api.isLoggedIn() && <NavLink className="nav-link" to="/login">Login</NavLink>}</NavItem>

                {api.isLoggedIn() && <NavItem className="d-flex align-items-center">{api.isLoggedIn() && <NavLink className="nav-link" to="/login">
                  {<svg onClick={(e) => this.handleLogoutClick(e)} className="logout-icon" style={{ width: "46px", fill: "white", height: "28px", padding: "3px", margin: "10px" }}> <use xlinkHref={`${NavIcons}#logout`} /> </svg>}</NavLink>}</NavItem>}

              </Nav>
            </Collapse>
          </Nav>
        </Navbar>
        Name < div>
          <Switch>
            <Route path="/" exact component={Home} />
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

export default App;
