import React from "react";
import {Col, Row} from "react-bootstrap";
import SearchCard from "./searchCard";


function FavouritePage() {
    let state = {
        articles: JSON.parse(localStorage.getItem("favouriteArticles"))
    };

    return <Row>{Object.keys(state.articles).map((key, index) =>
        <Col md = {3} xs ={12} key={index}>
            <SearchCard article={state.articles[key]} /></Col>)}</Row>;
}

export default FavouritePage;
