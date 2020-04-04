import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import SearchCard from "./searchCard";
import {toast, ToastContainer, Zoom} from "react-toastify";

function FavouritePage() {
    const [articles, setArticles] = useState(JSON.parse(localStorage.getItem("favouriteArticles")));

    const clickHandler = () => {
        console.log("clicked");
    };

    const deleteHandler = (article) => {
        toast("Removing - " + article.title);
        setArticles(JSON.parse(localStorage.getItem("favouriteArticles")));
    };

    return <>
        {Object.keys(articles).length ?
            <Row className={"p-3"}>
                <Col xs={12}>
                    <p className={"h4"}>Favorites</p></Col>
                {Object.keys(articles).map((key, index) =>
                    <Col xs={12} sm={6} md={4} lg={3} key={index} style={{padding: "0"}}>
                    <SearchCard article={articles[key]} onClick={clickHandler} onDelete={deleteHandler}/></Col>)}</Row> :
            <p className={"text-center p-3 h4"}>You have no saved articles</p>
        }        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        draggable
        transition={Zoom}
    /></>;
}

export default FavouritePage;
