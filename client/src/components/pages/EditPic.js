import React, { Component } from 'react';
import api from '../../api';
import LocationSearchInput from './LocationSearchInput';
import Geocode from "react-geocode";
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';


class EditPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Up in the air", "Waterfall", "Woods", "Other"],
      image: "",
      imageName: "",
      lat: null,
      long: null,
      address: "",
      tag: "Beach",
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeAdress = this.handleChangeAdress.bind(this)
    this.handleGeolocation = this.handleGeolocation.bind(this)
  }

  handleSelect(latLng) {
    console.log("handle select", latLng)
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
        [stateFieldName]: event.target.files[0],
        imageName: event.target.files[0].name,
        imageWasEdited: true
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
      // image: this.state.image,
      tag: this.state.tag
    }
    console.log("PIN", pin)
    api.editPin(pin, this.props.match.params.id)
      .then(result => {
        console.log('EDIT PIC SUCCESS!', result)
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="AddPic background">
        <div className="AddPic container" style={{ paddingTop: "60px" }}>
          <h1>Edit your Pin</h1>
          <Form dark onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup row>
              <Label for="exampleFile" sm={4}>Edit your Picture</Label>
              <Col sm={8}>
                <input id="f02" type="file" onChange={(e) => this.handleInputChange("image", e)} placeholder="Edit picture" />
                <label for="f02">{this.state.imageName}</label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEdit" sm={4}>Tags</Label>
              <Col sm={8}>
                <Input type="select" name="tag" id="exampleEdit" value={this.state.tag} onChange={(e) => this.handleInputChange("tag", e)}>
                  {this.state.tags.map((el, i) =>
                    (<option value={el} key={i} >{el}</option>))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleLocation" sm={4}>Location</Label>
              <Col sm={8}>
                <LocationSearchInput name="address" value={this.state.address} handleGeolocation={(lat, long) => this.handleGeolocation(lat, long)} onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
              </Col>
            </FormGroup>
            <button className="upload-button" block>Confirm changes</button>
          </Form>
          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}
        </div>
      </div>
    );
  }


  componentDidMount() {
    api.getPin(this.props.match.params.id)
      .then(pin => {
        console.log("PINTODEDIT", pin)
        console.log("ImageTODEDIT", pin.pinFromDb.image)
        console.log("pinfilename", pin.pinFromDb.fileName)
        this.setState({
          image: pin.pinFromDb.image,
          imageName: pin.pinFromDb.fileName,
          lat: pin.pinFromDb.lat,
          long: pin.pinFromDb.long,
          address: pin.pinFromDb.address,
          tag: pin.pinFromDb.tag,
        })
      })
  }
}

export default EditPic;

// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: this.props.value
//     };
//   }

//   // handleChange = address => {
//   //   this.setState({ address });
//   // };

//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => this.props.onSelect(latLng))
//       .catch(error => console.error('Error', error));
//   };

//   render() {
//     console.log("DEBUGGGG")
//     return (

//       <PlacesAutocomplete
//         value={this.props.address}
//         onChange={this.props.handleChangeAdress}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map((suggestion, i) => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div key={i}
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }