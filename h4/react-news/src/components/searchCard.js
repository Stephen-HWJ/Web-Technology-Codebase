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

toast.configure(<ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    draggable
    transition={Zoom}
/>);

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
        // if(!e.target.outerHTML.includes("<path") && !e.target.outerHTML.includes("circle") && !e.target.outerHTML.includes("aria-hidden")){
            let fav = JSON.parse(localStorage.getItem("favouriteArticles"));
            console.log(article.id);
            delete fav[article.id];
            localStorage.setItem("favouriteArticles", JSON.stringify(fav));
            toast("Removing - " + article.title);
            console.log(fav);
            // window.location.reload();
        // }
        // else{
        //     e.stopPropagation();
        // }
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
        <Card className="article shadow m-3 d-inline-block" style={{padding: '0'}}>
            <Card.Body>
                <Card.Title>
                    {article.title}<MyShare title={article.title} url={article.url}/>
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