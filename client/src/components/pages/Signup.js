import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
// import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Alert,
  Form
} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null,
      visible: true
    }
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => this.setState({ message: err.response.data.message }))

  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <FormGroup row>
          <Label for="exampleName" sm={4}>Username</Label>
          <Col sm={4}>
            <Input
              input type="text" name="username" value={this.state.username}
              onChange={(e) => this.handleInputChange("username", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleName" sm={4}>Password</Label>
          <Col sm={4}>
            <Input
              input type="password" name="password" value={this.state.password}
              onChange={(e) => this.handleInputChange("password", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label ></Label>
          <Col className="text-center" sm={4}>
            {this.state.message && (
              <Alert
                color="danger"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {this.state.message}
              </Alert>
            )}
          </Col>
        </FormGroup>
        <Button color="primary" onClick={(e) => this.handleClick(e)}>Signup</Button>
      </div>
    );
  }
}


export default Signup;







{/* <div className="Signup">
        <h2>Signup</h2>
        <form>
          Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        <Link to="/login">Already have an account? Login here.</Link>
      </div> */}


// <div className="Signup">
//   <Jumbotron>
//     <Form className="formGroup" dark inline>
//       <div className="loginFormHeader"><h2>Signup</h2>
//       </div>
//       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
//         <Label for="exampleText" className="mr-sm-2">Username</Label>
//         <Input type="text" id="exampleText" placeholder="Your Name" type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
//       </FormGroup>
//       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
//         <Label for="examplePassword" className="mr-sm-2">Password</Label>
//         <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
//       </FormGroup>
//       <Button className="button" onClick={(e) => this.handleClick(e)}>Submit</Button>
//       {this.state.message && <div className="info info-danger">
//         {'  '}{this.state.message}
//       </div>}
//     </Form>
//     <Link to="/login">Already have an account? Sign up here.</Link>
//   </Jumbotron>
// </div>