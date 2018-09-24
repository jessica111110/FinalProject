import React, { Component } from 'react';
import api from '../../api';
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from 'reactstrap';



class AddPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: "",
      lat: null,
      long: null,
      address: "",
      tag: ["Beach", "Climbing", "Coast", "Desert", "Djungle", "Food", "Glacier", "Hiking", "Lake", "Mountainbiking", "Mountains", "Sea", "Snow", "Waterfall", "Woods"],
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChangeAdress = this.handleChangeAdress.bind(this)
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

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let Pin = {
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      image: this.state.image,
      tag: this.state.tag
    }
    console.log("PIN", Pin)
    api.postPin(Pin)
      .then(result => {
        console.log('ADD PIC SUCCESS!')
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
        <form>
          <input type="file" name="image" id="" onChange={(e) => this.handleInputChange("image", e)} /> <br /> <br />
          {/* Latitude: <input type="text" value={this.state.latitude} onChange={(e) => this.handleInputChange("latitude", e)} /> <br /> */}
          {/* Longitude: <input type="text" value={this.state.longitude} onChange={(e) => this.handleInputChange("longitude", e)} /> <br /> */}
          Tags 1:
          <Input type="select" name="select" id="exampleSelect">
            {this.state.tag.map((el, i) =>
              (<option>{this.state.tag[i]}</option>))
            }
          </Input>
          {/* Tags 2:
          <input type="text" name="tag" value={this.state.tag} onChange={(e) => this.handleInputChange("tag", e)} /> <br /> */}
          <LocationSearchInput name="address" onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
          <button onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
      </div>
    );
  }
}

export default AddPic;

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