
import React, { Component } from 'react';
import './Sample.css';
import AllPinsLogo from "../../images/all.png"
import MyPinsLogo from "../../images/me.png"

class RadioFields extends Component {

  render() {
    return (
      <div className="switch-field">
        <input
          type="radio"
          id="switch_left"
          onChange={e => this.props.handleFilterMineOrAll(e)}
          name="display"
          value="All"
          checked={!this.props.showOnlyMyPins}
        />
        <label for="switch_left"><img style={{ width: "18px" }} src={AllPinsLogo} alt="switch_left" /></label>
        <input
          onChange={e => this.props.handleFilterMineOrAll(e)}
          type="radio"
          id="switch_right"
          name="display"
          value="Mine"
          checked={this.props.showOnlyMyPins}
        />
        <label for="switch_right"><img style={{ width: "14.5px" }} src={MyPinsLogo} alt="switch_right" /></label>
      </div>
    );
  }
}

export default RadioFields;
