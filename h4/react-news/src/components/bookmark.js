import React from "react";
import FB from "./fabookmark";
import FBneg from "./faunbookmark";

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
            delete localFav[this.props.id];
        } else {
            localFav[this.props.id] = this.props.article;
        }
        localStorage.setItem("favouriteArticles", JSON.stringify(localFav));
        this.setState({bookmarked: !this.state.bookmarked});
        console.log(localStorage.getItem("favouriteArticles"));
    };

    render () {
        return this.state.bookmarked ?
                <span onClick={this.clickHandler}><FB/></span>:
                <span onClick={this.clickHandler}><FBneg/></span>

    };
}

export default MyBookmarkIcon;