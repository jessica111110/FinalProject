
import React, { Component } from 'react';
import './Sample.css';


let GeolocateUser = (props) => {

  let getLocation = (e) => {
    e.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation not supported")
    }
  }
  let showPosition = (position) => {
    props.handleGeolocation(position.coords.latitude, position.coords.longitude)
  }
  return (
    <div className="GeolocateUser">
      <p>Click the button to get your coordinates.</p>
      <button onClick={e => getLocation(e)} >Yes</button>
    </div>
  )
}


export default GeolocateUser;