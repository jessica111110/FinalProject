import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const K_WIDTH = 400;
const K_HEIGHT = 300;

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

class EnlargedImage extends Component {
  render() {
    let borderColor = this.props.borderColor || '#f44336'
    return (
      <div style={{ ...greatPlaceStyle, borderColor: borderColor, position: "absolute" }} onClick={this.props.onClick} onMouseLeave={this.props.onMouseLeave} >
        {<div style={{ position: "relative" }}>
          <img src={this.props.image} width="400" height="300" objectfit="cover" alt="test" />
          {this.props.isOwner && <div>
            <button style={{ position: "absolute", top: "8%", left: "85%" }}><Link to={"/edit-picture/" + this.props.pinId._id}>Edit</Link></button>
            <button style={{ position: "absolute", top: "8%", left: "70%" }} onClick={e => this.props.deletePin(e, this.props.pinId)}>DEL</button></div>}
        </div>
        }
        <div>{this.props.children}</div>
      </div>
    );
  }
}


export default EnlargedImage;