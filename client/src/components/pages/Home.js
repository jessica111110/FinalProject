import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import RectangleMarker from '../Markers/RectangleMarker';
import SearchField from '../pages/SearchField';
import RadioFields from '../pages/RadioFields';
import GoogleMap from 'google-map-react';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      tagFilter: "",
      showOnlyMyPins: false,
      currentUser: "",
    }
    // api.loadUser();  
    this.handleInputChange = this.handleInputChange.bind(this)
    this._setCurrentUser = this._setCurrentUser.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.handleFilterMineOrAll = this.handleFilterMineOrAll.bind(this)
  }

  handleInputChange(stateFieldName, event) {
    event.preventDefault();
    if (stateFieldName === "tagFilter" && event.target.value === "All") {
      this.setState({
        [stateFieldName]: ""
      })
      return;
    }
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleFilterMineOrAll(stateFieldName, event) {
    event.target.value === "Mine" && this.setState({ [stateFieldName]: true })
    event.target.value === "All" && this.setState({ [stateFieldName]: false })
  }

  _setCurrentUser(pinOwner) {
    return this.state.currentUser._id === pinOwner
  }

  deletePin(event, pinIdToDelete) {
    event.preventDefault();
    api.deletePin(pinIdToDelete._id)
      .then(toDelete => {
        this.setState({
          pins: this.state.pins.filter(p =>
            p !== pinIdToDelete
          )
        })
      })
  }

  render() {
    return (
      <div className="Home" style={{ paddingTop: "44px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              {api.isLoggedIn() && <RadioFields showOnlyMyPins={this.state.showOnlyMyPins} handleFilterMineOrAll={this.handleFilterMineOrAll} />}
            </div>
            <div className="col-xs-6" style={{ marginTop: "37px" }}>
              <SearchField tagFilter={this.state.tagFilter} handleInputChange={this.handleInputChange} />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 190px)' }}>
          <GoogleMap
            margin={[10, 20, 30, 40]}
            // apiKey={YOUR_GOOGLE_MAP_API_KEY}
            center={{ lat: 49.52, lng: 11.40 }}
            zoom={4.1}>
            {this.state.pins.filter(p => {
              if (this.state.tagFilter === "" && !this.state.showOnlyMyPins) {
                return true
              }
              else if (this.state.tagFilter !== "" && !(this.state.showOnlyMyPins)) {
                return p.tag === this.state.tagFilter
              }
              else if (this.state.tagFilter !== "" && this.state.showOnlyMyPins) {
                return p.tag === this.state.tagFilter && p._owner === this.state.currentUser._id
              }
              else if (this.state.showOnlyMyPins && this.state.tagFilter === "") {
                return p._owner === this.state.currentUser._id
              }
            }).map((p, i) => (
              <RectangleMarker
                address={p.address}
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
    this.setState({
      currentUser: user
    })
    api
      .getPins()
      .then(pins => {
        this.setState({
          pins: pins
        })
      })
  }
}

export default Home;
