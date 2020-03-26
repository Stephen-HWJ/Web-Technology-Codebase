import React from "react";
import Card from "react-bootstrap/Card";
import MyBadge from "./badge";
import Image from "react-bootstrap/Image";
import MyShare from "./share";

function SearchCard(props) {
    const { article } = props;
    return (
        <Card className="article shadow m-3 d-inline-block" style={{padding: '0'}} >
            <Card.Body>
                <Card.Title>{article.title}<MyShare title={article.title} url={article.url}/></Card.Title>
                <Image src={article.image} thumbnail/>
                <Card.Text style={{marginTop: '10px'}}><span className={"font-italic"}>{article.date.slice(0, 10)}</span> <MyBadge text={props.article.section}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SearchCard;