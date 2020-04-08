import React, { Component } from "react";
import MyBounceLoader from "./loader";
import ArticleCard from "./article";
import { withRouter } from "react-router-dom";

const serverUrl = "https://nodejs-hwj.appspot.com";

class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articles: []
        }
    }

    fetchArticles = (src) => {
        let fetchUrl = this.props.match.params["sec"] ?
            serverUrl + "/" + src + "/" + this.props.match.params["sec"]  : serverUrl + "/" + src + "/home";
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articles: data["returnArray"],
                    loading: false
                })
            }, err => {
                console.log("fetch error", err);
            });
    };

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setState({
            loading: true,
            articles: []
        }, () => {
            this.fetchArticles(localStorage.getItem("news_src"));
        });
    }

    componentDidMount() {
        if (!localStorage.getItem("news_src")) {
            localStorage.setItem("news_src", "guardian");
        }
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

export default withRouter(SectionPage);
