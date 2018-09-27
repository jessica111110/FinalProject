// Example of component you can copy/paste to create new components


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './Sample.css';

class PlusButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  // handleClick(event) {
  //   event.preventDefault();
  //   api.isLoggedIn ? this.props.history.push("/add-picture") : this.props.history.push("/")
  // }

  render() {
    return (
      <div className="PlusButton">
        {api.isLoggedIn() ? <Link to="/add-picture"><button>+</button></Link> : <Link to="/login"><button>+</button></Link>}
        {/* <button onClick={(e) => this.handleClick(e)}>+</button> */}
      </div>
    );
  }
}
export default PlusButton;
