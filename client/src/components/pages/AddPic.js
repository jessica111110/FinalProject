import React, { Component } from 'react';
import api from '../../api';
import LocationSearchInput from './LocationSearchInput';
import Geocode from "react-geocode";
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';



class AddPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterTag: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Up in the air", "Waterfall", "Woods", "Other"],
      image: "",
      lat: null,
      long: null,
      address: "",
      tag: "Beach",
      askGeolocation: true,
      acceptGeolocation: false,
      declineGeolocation: false,
      message: null,
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
        this.setState({ message: err.response.data.message })
      })
  }

  render() {
    return (
      <div className="AddPic container" style={{ paddingTop: "60px" }}>
        <h1>Add picture</h1>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup row>
            <Label for="exampleFile" sm={4}>Choose your Picture</Label>
            <Col sm={8}>
              <Input type="file" name="image" id="exampleFile" onChange={(e) => this.handleInputChange("image", e)} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelect" sm={4}>Tags</Label>
            <Col sm={8}>
              <Input type="select" name="tag" id="exampleSelect" onChange={(e) => this.handleInputChange("tag", e)}>
                {this.state.filterTag.map((el, i) =>
                  (<option key={i} value={el}>{el}</option>))
                }
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelect" sm={4}>Location</Label>
            <Col sm={8}>
              <LocationSearchInput name="address" handleGeolocation={(lat, long) => this.handleGeolocation(lat, long)} onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
            </Col>
          </FormGroup>
          <Button block>Upload</Button>
        </Form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default AddPic;
