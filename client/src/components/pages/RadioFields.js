
import React, { Component } from 'react';
import './Sample.css';

class RadioFields extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOnlyMyPins: false
    }
    // this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    console.log("I have changed")
    this.props.handleFilterMineOrAll("showOnlyMyPins", e)
    this.setState({
      showOnlyMyPins: !this.state.showOnlyMyPins
    })
  }

  render() {
    return (
      <div className="switch-field">
        <input type="radio" id="switch_left" onClick={e => this.handleChange(e)} name="display" value="All" checked={!this.state.showOnlyMyPins} />
        <label for="switch_left">All</label>
        <input onClick={e => this.handleChange(e)} type="radio" id="switch_right" name="display" value="Mine" checked={this.state.showOnlyMyPins} />
        <label for="switch_right">Mine</label>
      </div>
    );
  }
}

export default RadioFields;

{/* <div className="RadioFields">
        <input id="switch_left" type="radio" name="display" checked={this.state.showOnlyMyPins} value="Mine" onChange={e => this.handleChange(e)} /> Mine
          <input id="switch_right" type="radio" name="display" checked={!this.state.showOnlyMyPins} value="All" onChange={e => this.handleChange(e)} /> All
      </div> */}