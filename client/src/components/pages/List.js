import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import api from '../../api';
import '../App.css';
import PlusButton from '../pages/PlusButton';
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
    this.handleHoverOverPic = this.handleHoverOverPic.bind(this)
    this.handleLeaveOverPic = this.handleLeaveOverPic.bind(this)
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

  handleHoverOverPic(e, key) {
    this.setState({
      showInfo: true,
      key: key
    })
  }

  handleLeaveOverPic(e, key) {
    this.setState({
      showInfo: false,
      key: key
    })
  }

  render() {
    return (

      <div className="List">
        <PlusButton />
        <SearchField tagFilter={this.state.tagFilter} handleInputChange={this.handleInputChange} />
        <div className="flex">
          {this.state.pins.filter(p => {
            if (this.state.tagFilter === null) return true
            else if (this.state.tagFilter !== "") {
              return p.tag === this.state.tagFilter
            }
          }).map((p, i) => (
            <div key={i} className="ListView">
              <img src={p.image} onMouseEnter={e => this.handleHoverOverPic(e, i)} onMouseLeave={e => this.handleLeaveOverPic(e, i)} alt="test" />
              {this.state.showInfo && i === this.state.key && <p>{p.address}</p>}
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