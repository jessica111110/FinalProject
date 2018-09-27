import React, { Component } from 'react';
import api from '../../api';
import { Input } from 'reactstrap';
import GeolocateUser from '../pages/GeolocateUser';
import LocationSearchInput from './LocationSearchInput';
import Geocode from "react-geocode";


class AddPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterTag: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Food", "Glacier", "Hiking", "Lake", "Mountainbiking", "Mountains", "Other", "Sea", "Snow", "Waterfall", "Woods"],
      image: "",
      lat: null,
      long: null,
      address: "",
      tag: "Beach",
      askGeolocation: true,
      acceptGeolocation: false,
      declineGeolocation: false
    }

    // if add picture requested and user is not logged in, user will be directed to login
    if (!api.isLoggedIn()) {
      this.props.history.push("/login")
      return;
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeAdress = this.handleChangeAdress.bind(this)
    this.handleGeolocation = this.handleGeolocation.bind(this)
  }

  handleSelect(latLng) {
    this.setState({
      lat: latLng.lat,
      long: latLng.lng,
    })
  }

  handleChangeAdress = address => {
    this.setState({ address });
  };

  // handleFileChange(event) {
  //   this.setState({
  //     file: event.target.files[0]
  //   })
  // }

  handleInputChange(stateFieldName, event) {
    if (stateFieldName === "image") {
      console.log("handle input", event.target.files[0])
      this.setState({
        [stateFieldName]: event.target.files[0]
      })
    }
    else {
      console.log("evnttagertevalue evtl tag", event.target.value)
      this.setState({
        [stateFieldName]: event.target.value
      })
    }
  }

  handleGeolocation(lat, long) {
    this.setState({
      lat: lat,
      long: long
    })
    console.log("lat, long", lat, long)
    Geocode.fromLatLng(lat, long).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({
          address: address
        })
      },
      error => {
        console.error(error);
      }
    );
    //do sth to convert lat/long in address!!
  }

  handleSubmit(e) {
    e.preventDefault()
    let pin = {
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      image: this.state.image,
      tag: this.state.tag
    }
    api.postPin(pin)
      .then(result => {
        console.log('ADD PIC SUCCESS!', result)
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="AddPic">
        <h2>Choose your Picture</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="file" name="image" id="" onChange={(e) => this.handleInputChange("image", e)} /> <br /> <br />
          {/* Latitude: <input type="text" value={this.state.latitude} onChange={(e) => this.handleInputChange("latitude", e)} /> <br /> */}
          {/* Longitude: <input type="text" value={this.state.longitude} onChange={(e) => this.handleInputChange("longitude", e)} /> <br /> */}
          Tags 1:
          <Input type="select" name="tag" id="exampleSelect" onChange={(e) => this.handleInputChange("tag", e)}>
            {this.state.filterTag.map((el, i) =>
              (<option key={i} value={el}>{el}</option>))
            }
          </Input>
          {/* Tags 2:
          <input type="text" name="tag" value={this.state.tag} onChange={(e) => this.handleInputChange("tag", e)} /> <br /> */}
          <GeolocateUser acceptGeolocation={this.state.acceptGeolocation} lat={this.state.lat} long={this.state.long} handleGeolocation={(lat, long) => this.handleGeolocation(lat, long)} />
          <LocationSearchInput name="address" onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default AddPic;
