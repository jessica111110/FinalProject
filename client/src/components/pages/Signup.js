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
      message: null
    }
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
      <div className="Login">
        <Jumbotron className="jumbotronSignup">
          <Row>
            <Col md="6" sm="4">
              <Form dark>
                <div className="SignupForm">
                  <h1 className="SignupHeader">Signup</h1>
                  <FormGroup row>
                    <Label for="exampleText" className="mr-sm-1">Email</Label>
                    <Input type="text" id="exampleText" placeholder="your Name" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" className="mr-sm-1">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
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










    )
  }
}

export default Signup;

{/* <Jumbotron className="jumbotronSignup">
          <Row>
            <Col md="4" xs="6" sm="6">
              <div className="LoginBlock">
                <div className="loginFormHeader"><h2>Signup</h2>
                </div>
                <Form dark>
                  <FormGroup row>
                    <Label for="exampleText" className="mr-sm-2">Email</Label>
                    <Input type="text" id="exampleText" placeholder="your Name" type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Button type="submit" className="button" onClick={(e) => this.handleClick(e)}>Signup</Button>
                    {this.state.message && <div className="info info-danger">
                      {this.state.message}
                    </div>}
                  </FormGroup>
                </Form>
              </div>
              <NavLink className="nav-link" to="/login">Already have an account? Login here.</NavLink>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Jumbotron> */}
