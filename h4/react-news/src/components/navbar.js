import React from "react";
import { FaBookmark} from 'react-icons/fa'
import {Navbar, Nav, OverlayTrigger, Tooltip} from 'react-bootstrap';

import { Form, FormControl } from "react-bootstrap";
import MySwitch from "./switch";



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
                <Nav pullright={"true"}>
                    <Navbar.Brand>
                        <OverlayTrigger
                            rootClose={true}
                            placement={'bottom'}
                            overlay={
                                <Tooltip id='tooltip-top2'>
                                    Bookmark
                                </Tooltip>
                            }
                        >
                            <FaBookmark />
                        </OverlayTrigger>
                    </Navbar.Brand>
                        {/*// The toggle is hidden in 1) favorites 2) search 3) article page*/}
                        <Navbar.Brand>
                            NYTimes
                        </Navbar.Brand>
                        <Nav.Link>
                        {/*<>*/}
                            <MySwitch />
                        {/*</>*/}
                        </Nav.Link>
                        <Navbar.Brand>
                            Guardian
                        </Navbar.Brand>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;