import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import RectangleMarker from '../markers/RectangleMarker';
import PlusButton from '../pages/PlusButton';
import SearchField from '../pages/SearchField';
import GoogleMap from 'google-map-react';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      tagFilter: null,
      currentUser: "",
    }
    // api.loadUser();  
    this.handleInputChange = this.handleInputChange.bind(this)
    this._setCurrentUser = this._setCurrentUser.bind(this)
    this.deletePin = this.deletePin.bind(this)
  }

  handleInputChange(stateFieldName, event) {
    event.preventDefault();
    if (stateFieldName === "tagFilter" && event.target.value == "All") {
      this.setState({
        [stateFieldName]: null
      })
      return;
    }
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  _setCurrentUser(pinOwner) {
    // console.log("TRUEORFALSE", this.state.currentUser._id === pinOwner)
    // console.log("TYPEOFCURRENTUSR", this.state.currentUser)
    // console.log("TYPEOFPIOWWNER", pinOwner)
    return this.state.currentUser._id === pinOwner
  }

  deletePin(event, pinIdToDelete) {
    event.preventDefault();
    api.deletePin(pinIdToDelete._id)
      .then(toDelete => {
        console.log("PINTODELETE", toDelete)
        this.setState({
          pins: this.state.pins.filter(p =>
            p !== pinIdToDelete
          )
        })
      })
  }

  render() {
    return (
      <div className="Home">
        <PlusButton />
        <SearchField tagFilter={this.state.tagFilter} handleInputChange={this.handleInputChange} />
        <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 40px)' }}>
          <GoogleMap
            margin={[10, 20, 30, 40]}
            // apiKey={YOUR_GOOGLE_MAP_API_KEY}
            center={{ lat: 0.56, lng: 18.80 }}
            zoom={0.1}>
            {this.state.pins.filter(p => {
              if (this.state.tagFilter === null) return true
              else if (this.state.tagFilter !== "") {
                return p.tag === this.state.tagFilter
              }
            }).map((p, i) => (
              <RectangleMarker
                deletePin={this.deletePin}
                key={i}
                pinId={p}
                image={p.image}
                lat={p.lat} lng={p.long}
                borderColor="red"
                isOwner={this._setCurrentUser(p._owner)}
              />
            ))}
          </GoogleMap>
        </div>
        {/* <ul>
          {this.state.pins.map(p => (
            <li>{p.tag}</li>
          ))}
        </ul> */}
      </div>
    );
  }

  componentDidMount() {
    let user = api.loadUser()
    console.log("USER", user)
    this.setState({
      currentUser: user
    })
    api
      .getPins()
      .then(pins => {
        console.log("PINS", pins)
        this.setState({
          pins: pins
        })
      })
  }
}

export default Home;
