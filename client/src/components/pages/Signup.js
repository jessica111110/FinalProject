import React, { Component } from 'react';
import api from '../../api';

import { Link, NavLink } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';

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
      .catch(err => this.setState({ message: err.response && err.response.data.message }))

  }

  render() {
    return (
      <div className="Login">
        <Jumbotron className="jumbotronSignup">
          <Row>
            <Col md="6" lg="4">
              <Form dark>
                <div className="SignupForm">
                  <h1 className="SignupHeader">Signup</h1>
                  <FormGroup row>
                    <Label for="exampleText" className="mr-sm-1">Username</Label>
                    <Input type="text" id="exampleText" placeholder="Choose a name" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" className="mr-sm-1">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Choose wisely" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Button type="submit" className="button" onClick={(e) => this.handleClick(e)}>Signup</Button>
                    {this.state.message && <div className="info info-danger">
                      {this.state.message}
                    </div>}
                  </FormGroup>
                </div>
              </Form>
              <NavLink className="nav-link" to="/login">Already have an account? Login here.</NavLink>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Jumbotron>
      </div>
    );
  }
}


{/* <div className="Signup">
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
</div> */}

export default Signup;
