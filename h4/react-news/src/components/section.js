import React, { Component } from "react";
import MyBounceLoader from "./loader";
import ArticleCard from "./article";

const serverUrl = "https://nodejs-hwj.appspot.com";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        // this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            loading: true,
            articles: []
        }
    }

    fetchArticles = (src) => {
        let fetchUrl = this.props.match.params["sec"] ?
            serverUrl + "/" + src + "/" + this.props.match.params["sec"] : serverUrl + "/" + src + "/home";
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articles: data["returnArray"],
                    loading: false
                })
            })
            .catch(err => {
                console.log("fetch error", err);
            });
    };

    componentDidMount() {
        this.fetchArticles(localStorage.getItem("news_src"));
    }

    render() {
        return (
            this.state.loading ?
                <MyBounceLoader /> :
                this.state.articles.map((article, index) =>
                    <ArticleCard article={article} key={index}/>)
        );
    }
}

export default SectionPage;
