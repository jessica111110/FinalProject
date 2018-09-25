import React, { Component } from 'react';
import EnlargedImage from './EnlargedImage';

const K_WIDTH = 125;
const K_HEIGHT = 100;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  borderRadius: 15,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  border: '5px solid',
  // borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

class RectangleMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoomIn: false,
    }
    // api.loadUser();  
    this.handleClickOnPin = this.handleClickOnPin.bind(this)
    this.leavePin = this.leavePin.bind(this)
  }

  handleClickOnPin(event) {
    event.preventDefault();
    this.setState({
      zoomIn: true
    })
  }

  leavePin(event) {
    event.preventDefault();
    this.setState({
      zoomIn: false
    })
  }

  render() {
    let borderColor = this.props.borderColor || '#f44336'

    return (
      <div style={{ ...greatPlaceStyle, borderColor: borderColor }} onMouseEnter={e => this.handleClickOnPin(e)} >
        {this.state.zoomIn ? <EnlargedImage image={this.props.image} onMouseLeave={e => this.leavePin(e)} /> : <img src={this.props.image} width="125" height="100" objectfit="cover" alt="test" />
        }        <div>{this.props.children}</div>
      </div>
    );
  }
}


export default RectangleMarker;