import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import RectangleMarker from '../markers/RectangleMarker'
import GoogleMap from 'google-map-react';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: []
    }
    // api.loadUser();
  }
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        <img src="https://www.w3schools.com/w3css/img_snowtops.jpg" alt="l" />
        <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 40px)' }}>
          <GoogleMap
            margin={[10, 20, 30, 40]}
            // apiKey={YOUR_GOOGLE_MAP_API_KEY}
            center={{ lat: 52.506, lng: 13.37 }}
            zoom={10}>
            {this.state.pins.map(p => (
              <RectangleMarker
                lat={p.lat} lng={p.long}
                borderColor="red"
                onClick={e => console.log("click")}
                onMouseLeave={e => console.log("mouseLeave")}>
                <img src={p.image} alt="test" />
              </RectangleMarker>
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
    api.getPins()
      .then(pins => {
        this.setState({
          pins: pins
        })
      })
  }
}

export default Home;
