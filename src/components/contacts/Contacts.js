import React, { Component } from "react";
import Contact from "./Contact.js";
import { Consumer } from "../../contextStore.js";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <div>
              <h1 className="text-success display-4 mb-3"> Contact List</h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
