
import React, { Component } from 'react';
import './Sample.css';
import AllPinsLogo from "../../images/all.png"
import MyPinsLogo from "../../images/me.png"

class RadioFields extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOnlyMyPins: false
    }
    // this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    this.props.handleFilterMineOrAll("showOnlyMyPins", e)
    this.setState({
      showOnlyMyPins: !this.state.showOnlyMyPins
    })
  }

  render() {
    return (
      <div className="switch-field">
        <input type="radio" id="switch_left" onChange={e => this.handleChange(e)} name="display" value="All" checked={!this.state.showOnlyMyPins} />
        <label for="switch_left"><img style={{ width: "18px" }} src={AllPinsLogo} alt="switch_left" /></label>
        <input onChange={e => this.handleChange(e)} type="radio" id="switch_right" name="display" value="Mine" checked={this.state.showOnlyMyPins} />
        <label for="switch_right"><img style={{ width: "14.5px" }} src={MyPinsLogo} alt="switch_right" /></label>
      </div>
    );
  }
}

export default RadioFields;
