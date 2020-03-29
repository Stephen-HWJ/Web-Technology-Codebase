import React, {useEffect} from "react";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import {Navbar, Nav, Col} from 'react-bootstrap';
import SearchBox from "./searchBox";
import MySwitch from "./switch";
import { useLocation } from 'react-router-dom';

import '../css/navbar.css';
import ReactTooltip from "react-tooltip";

function MyNavbar() {
    useEffect(() => {
        if (!localStorage.getItem("favouriteArticles")){
            localStorage.setItem("favouriteArticles", JSON.stringify({}));
        }
        if (!localStorage.getItem("news_src")){
            localStorage.setItem("news_src", "guardian");
        }
    });

    let location = useLocation();

    let showSwitch = () => {
        let sections = ["/", "/section/world", "/section/politics",
            "/section/business", "/section/technology", "section/sports"];
        return sections.includes(location.pathname);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id={"head"}>
            <Col xs={"9"} sm={"5"} md={"3"} xl={"2"} style={{marginRight: "10px", padding: "0"}}><SearchBox /></Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" activeKey={location.pathname}>
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href="/section/world">World</Nav.Link>
                    <Nav.Link href="/section/politics">Politics</Nav.Link>
                    <Nav.Link href="/section/business">Business</Nav.Link>
                    <Nav.Link href="/section/technology">Technology</Nav.Link>
                    <Nav.Link href="/section/sports">Sports</Nav.Link>
                </Nav>

            <Nav pullright={"true"}>
                <Nav.Link href="/favourite" className={"tag"}>
                    {location.pathname === "/favourite" ?
                        <FaBookmark data-tip="Bookmark" data-for={"navbar"} size={20}/>:
                        <FaRegBookmark data-tip="Bookmark" data-for={"navbar"} size={20}/>
                    }
                    <ReactTooltip place="bottom" id={"navbar"} type="dark" effect="solid"/></Nav.Link>
                <Nav.Item>
                    {showSwitch()?
                        <MySwitch />:null}
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;