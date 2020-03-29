import React from "react";
import Card from "react-bootstrap/Card";
import MyBadge from "./badge";
import Image from "react-bootstrap/Image";
import MyShare from "./share";
import {useHistory} from "react-router-dom";
import {MdDelete} from "react-icons/md";
import { toast, ToastContainer, Zoom } from 'react-toastify';
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
        toast("Removing - " + article.title);
        props.onDelete();
    };

    let location = useLocation();

    let getSource = () => {
        return article.id.slice(0, 4) === "http" ? "NYTIMES" : "GUARDIAN";
    };

    let showDelete = () => {
        return location.pathname === "/favourite";
    };

    console.log(article);

    return (
        <>
        <Card className="shadow m-2 d-inline-block " onClick={clickHandler} style={{cursor: "pointer"}}>
            <Card.Body>
                <Card.Title>
                    <TextTruncate line={2} element={"span"} truncateText="…" text={article.title}/>
                    <MyShare title={article.title} url={article.url}/>
                    {showDelete()? <MdDelete onClick={deleteHandler}/> : null}
                </Card.Title>
                <Image src={article.image} thumbnail/>
                <Card.Text style={{marginTop: '10px'}}>
                    <span className={"font-italic"}>{article.date.slice(0, 10)}</span>
                    <MyBadge text={props.article.section}/>
                    {showDelete()? <MyBadge text={getSource()}/> : null}
                </Card.Text>
            </Card.Body>
        </Card>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            draggable
            transition={Zoom}
        />
        </>
    )
}

export default SearchCard;