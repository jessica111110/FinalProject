import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
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
        <Jumbotron>
          <Form className="formGroup" dark inline>
            <div className="loginFormHeader"><h2>Login</h2>
            </div>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleText" className="mr-sm-2">Email</Label>
              <Input type="text" id="exampleText" placeholder="your Name" type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
            </FormGroup>
            <Button className="button" onClick={(e) => this.handleClick(e)}>Submit</Button>
            {this.state.message && <div className="info info-danger">
              {this.state.message}
            </div>}
          </Form>
          <Link to="/signup">No account yet? Sign up here.</Link>
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
