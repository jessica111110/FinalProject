import React, { Component } from 'react';
import api from '../../api';


class AddPic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: "",
      latitude: "",
      longitude: "",
      tags: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.file, this.state.latitude, this.state.longitude, this.state.tags)
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
          <input type="file" name="" id="" /> <br /> <br />
          Latitude: <input type="text" value={this.state.latitude} onChange={(e) => this.handleInputChange("latitude", e)} /> <br />
          Longitude: <input type="text" value={this.state.longitude} onChange={(e) => this.handleInputChange("longitude", e)} /> <br />
          Tags: <input type="text" value={this.state.tags} onChange={(e) => this.handleInputChange("tags", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
      </div>
    );
  }
}

export default AddPic;