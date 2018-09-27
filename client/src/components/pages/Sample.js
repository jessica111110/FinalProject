// Example of component you can copy/paste to create new components


import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
// import api from '../api';
// import './Sample.css';

class Sample extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="Sample">
        Hello Sample
      </div>
    );
  }
}

export default Sample;




//       <div className="AddPic">
// <Form onSubmit={(e) => this.handleSubmit(e)}>
//           <FormGroup>
//           <Label for="exampleFile">Choose your Picture</Label>
//           <Input type="file" name="image" id="exampleFile" onChange={(e) => this.handleInputChange("image", e)} />
//           <FormText color="muted">
//             This is some placeholder block-level help text for the above input.
//             It's a bit lighter and easily wraps to a new line.
//           </FormText>
//         </FormGroup>
//         <FormGroup>
//           <Label for="exampleSelect">Tags</Label>
//           <Input type="select" name="tag" id="exampleSelect" onChange={(e) => this.handleInputChange("tag", e)}>
//           {this.state.filterTag.map((el, i) =>
//               (<option key={i} value={el}>{el}</option>))
//             }
//           </Input>
//         </FormGroup>
//           <LocationSearchInput name="address" onSelect={this.handleSelect} handleInputChange={this.handleInputChange} address={this.state.address} handleChangeAdress={this.handleChangeAdress} />
//         <Button>Upload</Button>
//       </Form>
//       {this.state.message && <div className="info info-danger">
//           {this.state.message}
//         </div>}
//       </div>