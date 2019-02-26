import React, { Component } from 'react';
import api from '../../api';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import '../App.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null,
      visible: true,
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
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.response && err.response.data.message }))

  }

  render() {
    return (

      <div className="Login">
        <Jumbotron className="jumbotronLogin" style={{ height: "95vh" }}>
          <Row>
            <Col md="6" lg="4">
              <Form dark>
                <div className="LoginForm">
                  <h1 className="LoginHeader">Login</h1>
                  <FormGroup row>
                    <Label for="exampleText" className="mr-sm-1">Username</Label>
                    <Input type="text" id="exampleText" placeholder="Enter your name" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" className="mr-sm-1">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Choose wisely" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Button type="submit" className="button" onClick={(e) => this.handleClick(e)}>Login</Button>
                    {this.state.message && <div className="info info-danger">
                      {this.state.message}
                    </div>}
                  </FormGroup>
                </div>
              </Form>
              <NavLink className="nav-link" to="/signup">No account yet? What are you waiting for? Sign up here.</NavLink>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Jumbotron>
      </div>
    )
  }
}

export default Login;
