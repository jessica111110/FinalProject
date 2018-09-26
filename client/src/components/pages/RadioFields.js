
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
    this.props.handleFilterMineOrAll("showOnlyMyPins", e)
    this.setState({
      showOnlyMyPins: !this.state.showOnlyMyPins
    })
  }

  render() {
    return (
      <div className="RadioFields">
        {/* <form action=""> */}
        <input type="radio" name="display" checked={this.state.showOnlyMyPins} value="Mine" onChange={e => this.handleChange(e)} /> Mine
          <input type="radio" name="display" checked={!this.state.showOnlyMyPins} value="All" onChange={e => this.handleChange(e)} /> All
          <button type="submit">FILTER</button>
        {/* </form > */}
      </div>
    );
  }
}

export default RadioFields;