import React, { Component } from 'react';
import EnlargedImage from './EnlargedImage';
import api from '../../api';

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
      favorizedCounter: this.props.favCounter,
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

  clickOnFav(event, pinId) {
    event.preventDefault();
    api.favorizePin(pinId)
      .then(toFavorize => {
        if (toFavorize.success) {
          this.setState({
            favorized: toFavorize.fav ? true : false,
            favorizedCounter: toFavorize.fav ? this.state.favorizedCounter + 1 : this.state.favorizedCounter - 1
          })
        }
      })
  }

  componentDidMount() {
    api.getPin(this.props.pinId)
      .then(pin => {
        var isFavedByUser = pin.favedByUser;
        if (pin.success) {
          this.setState({
            favorized: isFavedByUser ? true : false,
            favorizedCounter: pin.pinFromDb.favorized
          })
        }
      })
      .catch(err => { console.log(err) })
  }



  render() {
    let borderColor = 'transparent'
    return (
      <div
        style={{ ...greatPlaceStyle, borderColor: borderColor, position: "absolute", zIndex: this.state.zIndex }}
        onMouseEnter={e => this.handleClickOnPin(e)}
        onClick={window.screen.width < 1040 ? e => this.handleClickMobile(e) : null}
      >
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