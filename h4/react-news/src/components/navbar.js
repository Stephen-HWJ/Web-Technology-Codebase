import React from "react";
import { FaBookmark} from 'react-icons/fa'
import {Navbar, Nav, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SearchBox from "./searchBox";
import MySwitch from "./switch";



import '../css/navbar.css';

function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            {/*<MediaQuery maxDeviceWidth = {767}>*/}
                <div style={{width:"20%"}}>
                    <SearchBox
                        // refresh = {this.state.refreshCount}
                    />
                </div>
            {/*</MediaQuery>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/section/world">World</Nav.Link>
                <Nav.Link href="/section/politics">Politics</Nav.Link>
                <Nav.Link href="/section/business">Business</Nav.Link>
                <Nav.Link href="/section/technology">Technology</Nav.Link>
                <Nav.Link href="/section/sports">Sports</Nav.Link>
            </Nav>
                <Nav pullright={"true"}>
                    <Navbar.Text>
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
                    </Navbar.Text>
                    <Nav.Link>
                    <MySwitch />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;