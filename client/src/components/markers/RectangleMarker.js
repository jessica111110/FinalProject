import React, { Component } from 'react';
import EnlargedImage from './EnlargedImage';

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
      zIndex: 0,
      favorized: false,
      favorizedCounter: 0,
    }
    // api.loadUser();  
    this.handleClickOnPin = this.handleClickOnPin.bind(this)
    this.leavePin = this.leavePin.bind(this)
    this.handleClickMobile = this.handleClickMobile.bind(this)
    this.clickOnFav = this.clickOnFav.bind(this)

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

  handleClickMobile(event) {
    event.preventDefault();
    this.setState({
      zoomIn: this.state.zoomIn ? false : true,
      zIndex: this.state.zIndex === 1 ? 0 : 1
    })
  }

  clickOnFav(event) {
    event.preventDefault();
    console.log("hereee")
    console.log(this.state.favorized)
    console.log(this.state.favorizedCounter)
    this.setState({
      favorized: this.state.favorized ? false : true,
      favorizedCounter: this.state.favorized ? this.state.favorizedCounter - 1 : this.state.favorizedCounter + 1
    })
    console.log("favorized", this.state.favorized)
    console.log("favcounter", this.state.favorizedCounter)
  }

  render() {
    let borderColor = 'transparent'
    return (
      <div style={{
        ...greatPlaceStyle, borderColor: borderColor, position: "absolute", zIndex: this.state.zIndex
      }} onMouseEnter={e => this.handleClickOnPin(e)} onClick={window.screen.width < 1040 ? e => this.handleClickMobile(e) : null} >
        {
          this.state.zoomIn
            ? <EnlargedImage
              address={this.props.address}
              clickOnFav={this.clickOnFav}
              favorized={this.state.favorized}
              favorizedCounter={this.state.favorizedCounter}
              deletePin={this.props.deletePin}
              pinId={this.props.pinId}
              onClick={this.handleClickMobile}
              isOwner={this.props.isOwner}
              image={this.props.image}
              onMouseLeave={e => this.leavePin(e)} />
            : <img className="rectangle-marker" src={this.props.image}
              alt="test" />
        } < div > {this.props.children}</div >
      </div >
    );
  }
}


export default RectangleMarker;