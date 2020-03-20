import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import { Form, FormControl, Button } from "react-bootstrap";
import '../css/navbar.css';

function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/shop">World</Nav.Link>
                <Nav.Link href="/shop">Politics</Nav.Link>
                <Nav.Link href="/shop">Business</Nav.Link>
                <Nav.Link href="/shop">Technology</Nav.Link>
                <Nav.Link href="/shop">Sports</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;