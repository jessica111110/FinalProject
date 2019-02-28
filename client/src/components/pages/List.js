import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import SearchField from '../pages/SearchField';


class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      tagFilter: null,
      showInfo: false,
      key: null
    }
    // api.loadUser();  
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(stateFieldName, event) {
    event.preventDefault();
    if (stateFieldName === "tagFilter" && event.target.value === "All") {
      this.setState({
        [stateFieldName]: null
      })
      return;
    }
    this.setState({
      [stateFieldName]: event.target.value
    })
  }


  render() {
    return (

      // padding-top: vorher 60px;

      <div className="List" style={{ paddingTop: "105px" }}>
        <div className="SearchFieldList">
          <SearchField tagFilter={this.state.tagFilter} handleInputChange={this.handleInputChange} />
        </div>
        <div className="flex">
          {this.state.pins.filter(p => {
            if (this.state.tagFilter === null) return true
            else if (this.state.tagFilter !== "") {
              return p.tag === this.state.tagFilter
            }
          }).map((p, i) => (
            <div key={i} className="ListView">
              <img src={p.image} alt="test" />
              <p>{p.address}</p>

            </div>
          ))}
        </div>



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

export default List;