import React, { Component } from 'react';
import api from '../../api';
import RectangleMarker from "../Markers/RectangleMarker";
import SearchField from '../pages/SearchField';
import RadioFields from '../pages/RadioFields';
import GoogleMap from 'google-map-react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      tagFilter: "",
      showOnlyMyPins: false,
      currentUser: "",
      sidebarToLeftClicked: true,
      loading: true
    }
    // api.loadUser();  
    this.handleInputChange = this.handleInputChange.bind(this)
    this._setCurrentUser = this._setCurrentUser.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.handleFilterMineOrAll = this.handleFilterMineOrAll.bind(this)
    this.handleClickSideBar = this.handleClickSideBar.bind(this)
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

  handleFilterMineOrAll(event) {
    event.target.value === "Mine" && this.setState({ showOnlyMyPins: true })
    event.target.value === "All" && this.setState({ showOnlyMyPins: false })
  }

  _setCurrentUser(pinOwner) {
    return this.state.currentUser._id === pinOwner
  }

  deletePin(event, pinIdToDelete) {
    event.preventDefault();
    api.deletePin(pinIdToDelete)
      .then(toDelete => {
        this.setState({
          pins: this.state.pins.filter(p =>
            p._id !== pinIdToDelete
          )
        })
      })
  }

  handleClickSideBar(event) {
    event.preventDefault();
    this.setState({
      sidebarToLeftClicked: this.state.sidebarToLeftClicked ? false : true
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading-container"><h1>LOADING...🌍</h1></div>
      )
    }
    return (
      <div className="Home" style={{ paddingTop: "95px" }}>
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
        <div>
        </div>
        <div className={this.state.sidebarToLeftClicked ? "sidebar sidebar-is-hidden" : "sidebar"}>
          <div className="sidebar-description">
            <h2>Map your most epic pictures all over the globe</h2>
            <p>lab  doe ededowe ruouec9w 833982 chudu9ewf dowvuec cii8eeiu ewiciec ofjec 3uhedhj ice ewiccihr</p>
          </div>
          <div className="sidebar-icon">
            <i className="fas fa-angle-left"
              onClick={e => this.handleClickSideBar(e)}
              style={{
                transform: this.state.sidebarToLeftClicked && "rotate(180deg)",
                marginRight: this.state.sidebarToLeftClicked && "18px",
                marginBottom: !this.state.sidebarToLeftClicked && "52vh"
              }}>
            </i>
          </div>
        </div>
        <div className="maps-container">
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
                favCounter={p.favorized}
                pinId={p._id}
                image={p.image}
                lat={p.lat} lng={p.long}
                borderColor="red"
                isOwner={this._setCurrentUser(p._owner)}
              />
            ))}
          </GoogleMap>
        </div>
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
        this.setState({ pins: pins })
        setTimeout(() => {

          this.setState({
            //pins: pins,
            loading: false
          })
        }, 1000);
      })
  }
}

export default Home;
