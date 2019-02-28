import React, { Component } from 'react';
import {
  Route,
  Switch,
  NavLink,
  Link
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
import BarIcon from '../../src/sprite(1).svg'



class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleClickOnNavIcon = this.handleClickOnNavIcon.bind(this);
    this.handleClickOnLogIn = this.handleClickOnLogIn.bind(this);
    this.handleClickOnSignUp = this.handleClickOnSignUp.bind(this);
    this.classToggle = this.classToggle.bind(this);


    this.state = {
      collapsed: true,
      isOpen: false,
      tooltipOpen: false,
      pictures: [],
      pins: [],
      // mapDisplayed: true,
      onLogIn: false,
      onSignUp: false,
    }
  }

  // api.loadUser();
  handleLogoutClick(e) {
    api.logout()
  }

  handleClickOnNavIcon(e) {
    this.setState({
      onLogIn: false,
      onSignUp: false
    })
  }

  handleClickOnLogIn(e) {
    this.setState({
      onLogIn: true,
      onSignUp: false
    })
  }

  handleClickOnSignUp(e) {
    this.setState({
      onLogIn: false,
      onSignUp: true
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

  classToggle(e) {
    const navs = document.querySelectorAll('.Navbar__Items--right')
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  }

  render() {
    return (

      <div>
        {/* Own navbar */}
        <div className="Navbar">
          <div className="Navbar__Link Navbar__Link-toggle" onClick={(e) => this.classToggle(e)}>
            {<svg
              className="menu-icon"
              style={{ fill: "white", width: "30px", height: "53px" }}>
              <use xlinkHref={`${BarIcon}#menu`} />
            </svg>}
          </div>
          <nav class="Navbar__Items">
            <Link onClick={(e) => this.handleClickOnNavIcon(e)} className="nav_link" exact to="/">
              <div className="Navbar__Link Navbar__Link-brand" href="/" exact>
                {<img className="img-logo" src={NavLogo} alt="Logo" />}
              </div>
            </Link>
          </nav>

          <nav class="Navbar__Items Navbar__Items--right">
            <Link onClick={(e) => this.handleClickOnNavIcon(e)} className="nav_link" to="/list-view">
              <div className="Navbar_Link" to="/list-view">
                {<img
                  className="img-list"
                  src={ListLogo}
                  alt="List"
                />}
              </div> </Link>


            <Link onClick={(e) => this.handleClickOnNavIcon(e)} className="nav_link" exact to="/">
              <div className="Navbar_Link" exact to="/">
                {<img
                  className="img-globe"
                  src={MapLogo}
                  alt="Map"
                />}
              </div></Link>


            {api.isLoggedIn() && <Link
              onClick={(e) => this.handleClickOnNavIcon(e)}
              className="Navbar_Link"
              to="/add-picture"
              href="#"
              id="TooltipExample">
              {<img className="img-cam" src={CreateLogo} alt="Add Pic" />}
            </Link>}

            {!api.isLoggedIn() && <Link
              onClick={(e) => this.handleClickOnSignUp(e)}
              style={{ color: this.state.onSignUp && "#fff" }}
              className="Navbar_Link Navbar_Link_Text"
              to="/signup">
              Signup
                                  </Link>}

            {!api.isLoggedIn() && <Link
              onClick={(e) => this.handleClickOnLogIn(e)}
              style={{ color: this.state.onLogIn && "#fff" }}
              className="Navbar_Link Navbar_Link_Text"
              to="/login">
              Login
                                  </Link>}

            {api.isLoggedIn() && <Link
              onClick={(e) => this.handleClickOnLogIn(e)}
              style={{ paddingRight: "15px" }}
              className="Navbar_Link"
              to="/login">
              {<svg
                onClick={(e) => this.handleLogoutClick(e)}
                className="logout-icon"
                style={{ width: "27px", fill: "white", height: "28px" }}>
                <use xlinkHref={`${NavIcons}#logout`} />
              </svg>}
            </Link>}
          </nav>
        </div>

        < div>
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
