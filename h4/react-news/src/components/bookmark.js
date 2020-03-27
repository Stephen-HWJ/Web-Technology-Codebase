import React from "react";
import FB from "./fabookmark";
import FBneg from "./faunbookmark";

class MyBookmarkIcon extends React.Component{
    state = {
        bookmarked: JSON.parse(localStorage.getItem("favouriteArticles")).includes(this.props.id)
    };

    clickHandler = () => {
        let localFav = JSON.parse(localStorage.getItem("favouriteArticles"));
        if (localFav.includes(this.props.id)) {
            localFav.splice(localFav.indexOf(this.props.id), 1);
        } else {
            localFav.push(this.props.id)
        }
        localStorage.setItem("favouriteArticles", JSON.stringify(localFav));
        this.setState({bookmarked: localFav.includes(this.props.id)});
        console.log(localStorage.getItem("favouriteArticles"));
    };

    render () {
        return this.state.bookmarked?
                <span onClick={this.clickHandler}><FB/></span>:
                <span onClick={this.clickHandler}><FBneg/></span>

    };
}

export default MyBookmarkIcon;