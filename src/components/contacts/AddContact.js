import React, { Component } from "react";
import { Consumer } from "../../contextStore.js";

import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //validation
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phoneis required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };
    axios
      .post("http://jsonplaceholder.typicode.com/users", newContact)
      .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h1>Add Contact</h1>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="AddContact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
