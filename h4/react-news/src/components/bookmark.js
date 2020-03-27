import React from "react";
import FB from "./fabookmark";
import FBneg from "./faunbookmark";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MyBookmarkIcon extends React.Component{
    state = {
        bookmarked: JSON.parse(localStorage.getItem("favouriteArticles"))[this.props.id] !== undefined
    };

    clickHandler = () => {
        let {article} = this.props;
        delete article.description;
        article["id"] = this.props.id;

        let localFav = JSON.parse(localStorage.getItem("favouriteArticles"));
        if (localFav[this.props.id]) {
            toast("Removing - " + article.title);
            delete localFav[this.props.id];
        } else {
            toast("Saving " + article.title);
            localFav[this.props.id] = this.props.article;
        }
        localStorage.setItem("favouriteArticles", JSON.stringify(localFav));
        this.setState({bookmarked: !this.state.bookmarked});
        console.log(localStorage.getItem("favouriteArticles"));
    };

    render () {
        return <>{this.state.bookmarked ?
                <span onClick={this.clickHandler}><FB/></span>:
                <span onClick={this.clickHandler}><FBneg/></span>}
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
    };
}

export default MyBookmarkIcon;