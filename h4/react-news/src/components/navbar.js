import React from "react";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import {Navbar, Nav, Col} from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import FavTag from "./favTag";

import SearchBox from "./searchBox";
import MySwitch from "./switch";

import '../css/navbar.css';

class MyNavbar extends React.Component{
    componentDidMount() {
        if (!localStorage.getItem("favouriteArticles")){
            localStorage.setItem("favouriteArticles", JSON.stringify({}));
        }
        if (!localStorage.getItem("news_src")){
            localStorage.setItem("news_src", "guardian");
        }
    };


    showSwitch = () => {
        let sections = ["/", "/section/world", "/section/politics",
            "/section/business", "/section/technology", "/section/sports"];
        return sections.includes(window.location.pathname);
    };

    render() {
        return<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id={"head"}>
            <Col xs={"9"} sm={"5"} md={"4"} lg={"3"} xl={"2"} style={{marginRight: "10px", padding: "0"}}><SearchBox /></Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" activeKey={window.location.pathname}>
                    <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/section/politics">Politics</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/section/business">Business</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/section/technology">Technology</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/section/sports">Sports</Nav.Link>
                </Nav>

                <Nav pullright={"true"}>
                    <Nav.Link as={NavLink} to="/favourite" className={"tag"}>
                        <FavTag/></Nav.Link>
                    {/*<Nav.Item style={{height: "36px"}}>*/}
                    {this.showSwitch()?
                        <>
                            <Navbar.Text
                                style={{color: "white", fontSize: "18px", height: "36px"}}>
                                NYTimes</Navbar.Text>
                            <Nav.Link style={{transform: "translateY(-23%)", height: "36px"}}><MySwitch /></Nav.Link>
                            <Navbar.Text
                                style={{color: "white", fontSize: "18px", height: "36px"}}>
                                Guardian</Navbar.Text></>
                        :null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}

export default withRouter(MyNavbar);