
import React, { Component } from "react";
import axios from "axios";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorText:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    axios.post("https://api.devcamp.space/sessions", 
    {
        client: {
            email: this.state.email ,
            password: this.state.password,
            errorText: ""
        }
    },
    {
        withCredentials : true
    }
    
    ).then( response => {
        console.log("response", response);
        if (response.data.status === "created") {
            console.log("You can come in...");
            this.props.handleSuccessfulAuth();
          } else {
            this.setState({
              errorText: "Wrong email or password"
            });
            this.props.handleUnSuccessfulAuth();
          }
    }).catch(error => {
        console.log("Some error ocurred", error);
        this.setState({
            errorText: "An error ocurred"
        })
        this.props.handleUnSuccessfulAuth();
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCES YOUR DASHBOARD</h1>
        <div>{this.state.errorText}</div>
        
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Your mail"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
