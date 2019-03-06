import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditLogo from "../../images/edit_w.png"
import DeleteLogo from "../../images/trash_w.png"
import api from '../../api';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


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
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

class EnlargedImage extends Component {

  render() {
    let borderColor = this.props.borderColor || 'transparent'
    return (
      <div
        style={{ ...greatPlaceStyle, borderColor: borderColor, position: "absolute" }}
        cursor='pointer'
        onClick={window.screen.width <= 1040 ? e => this.props.onClick(e) : null}
        onMouseLeave={window.screen.width > 1040 ? e => this.props.onMouseLeave(e) : null}
      >
        {<div className="MapView" style={{ position: "relative" }}>
          <img
            src={this.props.image}
            className="enlarged-image"
            width="400" height="300"
            alt="test"
            style={{ objectFit: "cover", borderRadius: 15 }}
          />
          <p>{this.props.address}</p>
          <div className="click">

            <span
              className="fas fa-star"
              onClick={e => this.props.clickOnFav(e, this.props.pinId)}
              style={{ color: this.props.favorized ? "#F5CC27" : "white" }}>
            </span>

            <a className="btn-counter" data-count={this.props.favorizedCounter}></a>
          </div>
          {this.props.isOwner && <div>
            <Link style={{ position: "absolute", top: "8%", left: "80%" }} to={"/edit-picture/" + this.props.pinId}>
              <img className="Icon edit" src={EditLogo} style={{ width: "37px" }} alt="t" />
            </Link>
            <img
              className="Icon delete"
              src={DeleteLogo}
              style={{ position: "absolute", top: "8%", left: "63%", width: "35px", cursor: "pointer" }}
              onClick={e => this.props.deletePin(e, this.props.pinId)} alt="t" />
          </div>}
        </div>}
        <div>{this.props.children}</div>
      </div>
    );
  }

}


export default EnlargedImage;