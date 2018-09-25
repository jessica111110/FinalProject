import React, { Component } from 'react';
import api from '../../api';
import '../App.css';
import PlusButton from '../pages/PlusButton';
import SearchField from '../pages/SearchField';


class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      tagFilter: null
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
      <div className="List">
        <PlusButton />
        <SearchField tagFilter={this.state.tagFilter} handleInputChange={this.handleInputChange} />
        {this.state.pins.filter(p => {
          if (this.state.tagFilter === null) return true
          else if (this.state.tagFilter !== "") {
            return p.tag === this.state.tagFilter
          }
        }).map((p, i) => (
          <img src={p.image} width="450" height="400" objectfit="cover" alt="test" alt="test" />
        ))}
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