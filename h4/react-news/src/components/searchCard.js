import React from "react";
import MyBadge from "./badge";
import {Image, Card} from "react-bootstrap";
import MyShare from "./share";
import {useHistory} from "react-router-dom";
import {MdDelete} from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import '../css/toastify.css';
import { useLocation } from 'react-router-dom';
import TextTruncate from "react-text-truncate";

function SearchCard(props) {
    const { article } = props;
    let history = useHistory();

    let clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        history.push("/article?id=" + article.id);
    };

    let deleteHandler = (e) => {
        console.log("removed " + article.id);
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let fav = JSON.parse(localStorage.getItem("favouriteArticles"));
        delete fav[article.id];
        localStorage.setItem("favouriteArticles", JSON.stringify(fav));
        props.onDelete(article);
    };

    let location = useLocation();

    let getSource = () => {
        return article.id.slice(0, 4) === "http" ? "NYTIMES" : "GUARDIAN";
    };

    let showDelete = () => {
        return location.pathname === "/favourite";
    };

    return (
        <Card className="shadow m-2 d-inline-block " onClick={clickHandler} style={{cursor: "pointer"}}>
            <Card.Body>
                <Card.Title>
                    <TextTruncate className={"font-weight-bold font-italic"} line={2} element={"span"} truncateText="…" text={article.title}/>
                    <MyShare title={article.title} url={article.url}/>
                    {showDelete()? <MdDelete onClick={deleteHandler}/> : null}
                </Card.Title>
                <Image src={article.image} thumbnail/>
                <Card.Text style={{marginTop: '10px'}}>
                    <span className={"font-italic"}>{article.date.slice(0, 10)}</span>

                    {showDelete()? <span className={"float-right"} ><MyBadge text={props.article.section}/><span> </span><MyBadge text={getSource()}/></span> :
                        <span className={"float-right"}><MyBadge  className={"float-right"}  text={props.article.section}/></span>}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SearchCard;