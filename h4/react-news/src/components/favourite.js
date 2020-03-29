import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import SearchCard from "./searchCard";

function FavouritePage() {
    const [articles, setArticles] = useState(JSON.parse(localStorage.getItem("favouriteArticles")));

    const clickHandler = () => {
        console.log("clicked");
    };

    const deleteHandler = () => {
        setArticles(JSON.parse(localStorage.getItem("favouriteArticles")));
    };

    return <>{Object.keys(articles).length ?
            <Row>
                <Col xs={12}>
                    <h4>Favorites</h4></Col>
                {Object.keys(articles).map((key, index) =>
                    <Col md = {3} xs ={12} key={index}>
                    <SearchCard article={articles[key]} onClick={clickHandler} onDelete={deleteHandler}/></Col>)}</Row> :
            <h4 className={"text-center"}>You have no saved articles</h4>}</>;
}

export default FavouritePage;
