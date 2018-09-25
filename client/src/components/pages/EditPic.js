import React, { Component } from 'react';
import api from '../../api';
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from 'reactstrap';


class EditPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: "",
      lat: null,
      long: null,
      address: "",
      tag: "Beach",
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeAdress = this.handleChangeAdress.bind(this)
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

  handleSubmit(e) {
    e.preventDefault()

    let pin = {
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      image: this.state.image,
      tag: this.state.tag
    }
    console.log("PIN", pin)
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
      <div className="EditPic">
        <h2>Choose your Picture</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="file" name="image" id="" onChange={(e) => this.handleInputChange("image", e)} /> <br /> <br />
          {/* Latitude: <input type="text" value={this.state.latitude} onChange={(e) => this.handleInputChange("latitude", e)} /> <br /> */}
          {/* Longitude: <input type="text" value={this.state.longitude} onChange={(e) => this.handleInputChange("longitude", e)} /> <br /> */}
          Tags 1:
          <Input type="select" name="tag" id="exampleSelect" onChange={(e) => this.handleInputChange("tag", e)}>
            {["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Food", "Glacier", "Hiking", "Lake", "Mountainbiking", "Mountains", "Other", "Sea", "Snow", "Waterfall", "Woods"].map((el) =>
              (<option value={el}>{el}</option>))
            }
          </Input>
          {/* Tags 2:
          <input type="text" name="tag" value={this.state.tag} onChange={(e) => this.handleInputChange("tag", e)} /> <br /> */}
          <LocationSearchInput name="address" onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default EditPic;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  // handleChange = address => {
  //   this.setState({ address });
  // };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSelect(latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    console.log("DEBUGGGG")
    return (

      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChangeAdress}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}