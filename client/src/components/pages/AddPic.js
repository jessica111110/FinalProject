import React, { Component } from 'react';
import api from '../../api';
import LocationSearchInput from './LocationSearchInput';
import Geocode from "react-geocode";
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

let labelDescr = "No file chosen"

class AddPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterTag: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Up in the air", "Waterfall", "Woods", "Other"],
      image: "",
      imageName: "",
      lat: null,
      long: null,
      address: "",
      tag: "Beach",
      imageWasUploaded: false,
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
      this.setState({
        [stateFieldName]: event.target.files[0],
        imageName: event.target.files[0].name,
        imageWasUploaded: true,
      })
    }
    else {
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
  }

  handleSubmit(e) {
    e.preventDefault()
    let pin = {
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      image: this.state.image,
      fileName: this.state.imageName,
      tag: this.state.tag
    }
    api.postPin(pin)
      .then(result => {
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        this.setState({ message: err.response.data.message })
      })
  }

  render() {
    return (
      <div className="AddPic background" >
        <div className="AddPic container">
          <h1>Add a picture</h1>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup row>
              <Label for="exampleFile" sm={4}>Choose your Picture</Label>
              <Col sm={8}>
                <input
                  id="f02"
                  type="file"
                  name="image"
                  onChange={(e) => this.handleInputChange("image", e)}
                  placeholder="Edit picture"
                />
                <label for="f02">{this.state.imageWasUploaded ? this.state.imageName : labelDescr}</label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={4}>Tags</Label>
              <Col sm={8}>
                <Input
                  type="select"
                  name="tag"
                  id="exampleSelect"
                  onChange={(e) => this.handleInputChange("tag", e)}
                >
                  {this.state.filterTag.map((el, i) =>
                    (<option key={i} value={el}>{el}</option>))
                  }
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={4}>Location</Label>
              <Col sm={8}>
                <LocationSearchInput
                  name="address"
                  handleGeolocation={(lat, long) => this.handleGeolocation(lat, long)}
                  onSelect={this.handleSelect}
                  handleInputChange={this.handleInputChange}
                  address={this.state.address}
                  handleChangeAdress={this.handleChangeAdress}
                />
              </Col>
            </FormGroup>
            <button className="upload-button" block>Upload</button>
          </Form>
          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}
        </div>
      </div>
    );
  }
}

export default AddPic;
