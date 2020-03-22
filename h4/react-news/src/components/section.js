import React, { Component } from "react";
import MyBounceLoader from "./loader";
import Article from "./article";

const serverUrl = "https://nodejs-hwj.appspot.com";

class SectionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            section: "technology",
            loading: true,
            articles: []
        }
    }

    fetchArticles = (src) => {
        let fetchUrl = serverUrl + "/" + src + "/" + this.state.section;
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
        this.fetchArticles("nyt");
    }

    render() {
        return (
            this.state.loading ?
                <MyBounceLoader /> :
                this.state.articles.map((article, index) =>
                    <Article article={article} key={index}/>)
        );
    }
}

export default SectionPage;
