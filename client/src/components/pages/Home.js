import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import RectangleMarker from '../markers/RectangleMarker';
import PlusButton from '../pages/PlusButton'
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
        <PlusButton />
        <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 40px)' }}>
          <GoogleMap
            margin={[10, 20, 30, 40]}
            // apiKey={YOUR_GOOGLE_MAP_API_KEY}
            center={{ lat: 0.56, lng: 18.80 }}
            zoom={0.1}>
            {this.state.pins.map(p => (
              <RectangleMarker
                image={p.image}
                lat={p.lat} lng={p.long}
                borderColor="red"
                onClick={e => console.log("click")}
                onMouseLeave={e => console.log("mouseLeave")}>
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
