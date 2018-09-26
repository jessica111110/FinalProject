
import React, { Component } from 'react';
import './Sample.css';

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ["All", "Beach", "Climbing", "Coast", "Desert", "Djungle", "Food", "Glacier", "Hiking", "Lake", "Mountainbiking", "Mountains", "Other", "Sea", "Snow", "Waterfall", "Woods"]
    }
    // this.handleChange = this.handleChange.bind(this)

  }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  render() {
    return (
      <div className="SearchField">
        <form action="">
          <select type="select" name="select" id="exampleSelect" onChange={(e) => this.props.handleInputChange("tagFilter", e)}>
            {/* <option value="null">All</option> */}
            {this.state.tags.map((el, i) =>
              (
                <option key={i} value={el}>{el}</option>
              ))
            }
          </select>
          <button type="submit">SEARCH</button>
        </form >
      </div>
    );
  }
}

export default SearchField;
