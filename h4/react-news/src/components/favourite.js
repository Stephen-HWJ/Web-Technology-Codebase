import React from "react";
import {Col, Row} from "react-bootstrap";
import SearchCard from "./searchCard";


function FavouritePage() {
    let state = {
        articles: JSON.parse(localStorage.getItem("favouriteArticles"))
    };

    return <>{Object.keys(state.articles).length ?
            <Row>
                <Col xs={12}>
                    <h4>Favorites</h4></Col>
                {Object.keys(state.articles).map((key, index) =>
                    <Col md = {3} xs ={12} key={index}>
                    <SearchCard article={state.articles[key]} /></Col>)}</Row> :
            <h4 className={"text-center"}>You have no saved articles</h4>}</>;
}

export default FavouritePage;
