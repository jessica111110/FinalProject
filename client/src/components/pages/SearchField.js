
import React, { Component } from 'react';
import './Sample.css';
import TagLogo from "../../images/hashtag_w.png"

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ["All", "Beach", "Climbing", "Coast", "City", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Up in the air", "Waterfall", "Woods", "Other"]
    }
  }

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label
            style={{ backgroundColor: "#DF7373" }}
            className="input-group-text"
            htmlFor="inputGroupSelect01">
            <img
              className="hashtagIcon"
              style={{ width: "18px" }}
              src={TagLogo}
              alt="k"
            />
          </label>
        </div>
        <select name="select" className="custom-select" id="inputGroupSelect01" onChange={(e) => this.props.handleInputChange("tagFilter", e)}>
          {this.state.tags.map((el, i) =>
            (
              <option key={i} value={el}>{el}</option>
            ))
          }
        </select>
      </div >
    );
  }
}

export default SearchField;