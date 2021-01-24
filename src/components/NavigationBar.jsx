import React, { Component } from "react";
// import Button from 'react-bootstrap/Button';
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
class NavigationBar extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Police Shootings Database Analytics</h1>
        <Navbar
          class="navbar navbar-expand-lg navbar-dark bg-dark text-center"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          {/* <Navbar.Brand href="#home">Home</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <ul ul class="navbar-nav ml-auto mx-auto">
              <Nav.Link href="#features">Health</Nav.Link>
              <Nav.Link href="#pricing">Economics</Nav.Link>
              <Nav.Link href="#pricing">History</Nav.Link>
              <Nav.Link href="#pricing">More</Nav.Link>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
