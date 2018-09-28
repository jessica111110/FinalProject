import React, { Component } from 'react';
import api from '../../api';
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { Jumbotron, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';


class EditPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Waterfall", "Woods", "Other"],
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
      <div className="EditPic">
        <Jumbotron className="jumbotronEdit">
          <Row>
            <Col md="6" sm="4">
              <img src={this.state.image} width="250" height="250" objectfit="cover" alt="test" />
              <Form dark onSubmit={(e) => this.handleSubmit(e)}>
                <div className="EditForm">
                  <h1 className="EditHeader">Edit your Pin</h1>
                  <FormGroup row>
                    <Label for="exampleEdit" className="mr-sm-1">Tags</Label>
                    <Input type="select" name="tag" id="exampleEdit" value={this.state.tag} onChange={(e) => this.handleInputChange("tag", e)}>
                      {this.state.tags.map((el, i) =>
                        (<option value={el} key={i} >{el}</option>)
                      )}
                    </Input>

                    <Label for="exampleLocation" className="mr-sm-1">Tags</Label>
                    <LocationSearchInput id="exampleLocation" name="address" value={this.state.address} onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
                    <Button type="submit" color="primary">Confirm changes</Button>
                  </FormGroup>
                </div>
              </Form>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Jumbotron>
      </div>





    );
  }

  componentDidMount() {
    api.getPin(this.props.match.params.id)
      .then(pin => {
        console.log("PINTODEDIT", pin)
        console.log("ImageTODEDIT", pin.pinFromDb.image)
        this.setState({
          image: pin.pinFromDb.image,
          lat: pin.pinFromDb.lat,
          long: pin.pinFromDb.long,
          address: pin.pinFromDb.address,
          tag: pin.pinFromDb.tag,
        })
      })
  }
}

export default EditPic;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.value
    };
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