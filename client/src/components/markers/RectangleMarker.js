import React, { Component } from 'react';

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
  render() {
    let borderColor = this.props.borderColor || '#f44336'
    return (
      <div style={{ ...greatPlaceStyle, borderColor: borderColor }} onClick={this.props.onClick} onMouseLeave={this.props.onMouseLeave} >
        {<img src={this.props.image} width="125" height="100" objectfit="cover" alt="test" />
        }        <div>{this.props.children}</div>
      </div>
    );
  }
}


export default RectangleMarker;