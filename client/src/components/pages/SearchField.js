
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
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label style={{ backgroundColor: "#DF7373" }} className="input-group-text" for="inputGroupSelect01"><img className="hashtagIcon" style={{ width: "18px" }} src="/hashtag_w.png" alt="k" /></label>
        </div>
        <select name="select" class="custom-select" id="inputGroupSelect01" onChange={(e) => this.props.handleInputChange("tagFilter", e)}>
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



// <div className="SearchField">
//         <form action="">
//           <select type="select" name="select" id="exampleSelect" onChange={(e) => this.props.handleInputChange("tagFilter", e)}>
//             {/* <option value="null">All</option> */}
//             {this.state.tags.map((el, i) =>
//               (
//                 <option key={i} value={el}>{el}</option>
//               ))
//             }
//           </select>
//         </form >
//       </div>