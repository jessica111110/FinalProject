import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import '../pages/Sample.css';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.value == "" ? '' : this.props.value };
    this.getLocation = this.getLocation.bind(this)
    this.showPosition = this.showPosition.bind(this)
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

  getLocation = (e) => {
    e.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation not supported")
    }
  }

  showPosition = (position) => {
    this.props.handleGeolocation(position.coords.latitude, position.coords.longitude)
  }

  render() {

    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChangeAdress}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="input-group mb-2" >
              <div className="input-group-prepend ">
                <div className="input-group-text" onClick={e => this.getLocation(e)}>
                  <img style={{ width: "20px" }} src="/images/gps-icon.png" alt="h" />
                </div>
              </div>
              <input
                className='location-search-input form-control'
                {...getInputProps({
                  placeholder: 'Search Places ...',
                })}
                value={this.props.address}
              />
            </div>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div key={i}
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

export default LocationSearchInput;