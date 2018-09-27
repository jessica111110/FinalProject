import React, { Component } from 'react';
import api from '../../api';
import { Link, NavLink } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import '../App.css';


class Login extends Component {
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
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.response.data.message }))

  }

  render() {
    return (

      <div className="Login">
        <Jumbotron className="jumbotronLogin">
          <Row>
            <Col md="6" sm="4">
              <Form dark>
                <div className="LoginForm">
                  <h1 className="LoginHeader">Login</h1>
                  <FormGroup row>
                    <Label for="exampleText" className="mr-sm-1">Email</Label>
                    <Input type="text" id="exampleText" placeholder="your Name" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" className="mr-sm-1">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
                  </FormGroup>
                  <FormGroup row>
                    <Button type="submit" className="button" onClick={(e) => this.handleClick(e)}>Login</Button>
                    {this.state.message && <div className="info info-danger">
                      {this.state.message}
                    </div>}
                  </FormGroup>
                </div>
              </Form>
              <NavLink className="nav-link" to="/signup">No account yet? Sign up here.</NavLink>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Jumbotron>
      </div>






    )
  }
}





{/* <form>
          Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Login</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        <Link to="/signup">Not yet any account? Signup here.</Link>
      </div>
    );
  }
} */}

export default Login;
