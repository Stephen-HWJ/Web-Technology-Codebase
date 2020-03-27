import React from "react";
import Card from "react-bootstrap/Card";
import MyBadge from "./badge";
import Image from "react-bootstrap/Image";
import MyShare from "./share";
import {useHistory} from "react-router-dom";
import {MdDelete} from "react-icons/md";

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

    let deleteHandler = (e) => {
        if(!e.target.outerHTML.includes("<path") && !e.target.outerHTML.includes("circle") && !e.target.outerHTML.includes("aria-hidden")){
            let fav = JSON.parse(localStorage.getItem("favouriteArticles"));
            console.log(article.id);
            delete fav[article.id];
            localStorage.setItem("favouriteArticles", JSON.stringify(fav));
            console.log(fav);
            window.location.reload();
        }
        else{
            e.stopPropagation();
        }
    };

    console.log(article);

    return (
        <Card className="article shadow m-3 d-inline-block" style={{padding: '0'}}>
            <Card.Body onClick={clickHandler}>
                <Card.Title>
                    {article.title}<MyShare title={article.title} url={article.url}/>
                    <MdDelete onClick={deleteHandler}/>
                </Card.Title>
                <Image src={article.image} thumbnail/>
                <Card.Text style={{marginTop: '10px'}}>
                    <span className={"font-italic"}>{article.date.slice(0, 10)}</span>
                    <MyBadge text={props.article.section}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SearchCard;