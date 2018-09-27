
import React from 'react';
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
    <div id="Geolocate">
      <button className="btn" onClick={e => getLocation(e)}>Get your current location{'  '}<img src="/images/Geolocate_Marker.png" style={{ width: "13%" }} alt="l" /></button>
    </div>
  )
}

export default GeolocateUser;