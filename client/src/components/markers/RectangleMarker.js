import React, { Component } from 'react';
import EnlargedImage from './EnlargedImage';
import '../../index.css'

const K_WIDTH = 100;
const K_HEIGHT = 80;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  borderRadius: 15,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  zIndex: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  border: '1px solid',
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
      zIndex: 0
    }
    // api.loadUser();  
    this.handleClickOnPin = this.handleClickOnPin.bind(this)
    this.leavePin = this.leavePin.bind(this)
  }

  handleClickOnPin(event) {
    event.preventDefault();
    this.setState({
      zoomIn: true,
      zIndex: 1
    })
  }

  leavePin(event) {
    event.preventDefault();
    this.setState({
      zoomIn: false,
      zIndex: 0
    })
  }

  render() {
    let borderColor = 'transparent'
    return (
      <div style={{
        ...greatPlaceStyle, borderColor: borderColor, position: "absolute", zIndex: this.state.zIndex
      }} onMouseEnter={e => this.handleClickOnPin(e)} >
        {
          this.state.zoomIn ? <EnlargedImage deletePin={this.props.deletePin} pinId={this.props.pinId} isOwner={this.props.isOwner} image={this.props.image} onMouseLeave={e => this.leavePin(e)} /> : <img src={this.props.image} width="110" height="90" borderRadius="15" style={{}} objectfit="cover" alt="test" />
        } < div > {this.props.children}</div >
      </div >
    );
  }
}


export default RectangleMarker;