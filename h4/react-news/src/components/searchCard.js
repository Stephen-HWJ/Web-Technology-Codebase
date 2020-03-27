import React from "react";
import Card from "react-bootstrap/Card";
import MyBadge from "./badge";
import Image from "react-bootstrap/Image";
import MyShare from "./share";
import {useHistory} from "react-router-dom";

function SearchCard(props) {
    const { article } = props;
    let history = useHistory();

    let clickHandler = (e) => {
        if(!e.target.outerHTML.includes("<path") && !e.target.outerHTML.includes("circle") && !e.target.outerHTML.includes("aria-hidden")){
            history.push("/article?id=" + article.id);
        }
        else{
            e.stopPropagation();
        }
    };

    return (
        <Card className="article shadow m-3 d-inline-block" style={{padding: '0'}}>
            <Card.Body onClick={clickHandler}>
                <Card.Title>{article.title}<MyShare title={article.title} url={article.url}/></Card.Title>
                <Image src={article.image} thumbnail/>
                <Card.Text style={{marginTop: '10px'}}><span className={"font-italic"}>{article.date.slice(0, 10)}</span> <MyBadge text={props.article.section}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SearchCard;