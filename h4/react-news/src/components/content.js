import React from "react";
import MyBounceLoader from "./loader";


class ArticleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.location.search.slice(2,),
            article: {},
        }
    }

    fetchArticles (src, id) {
        let fetchUrl = "https://nodejs-hwj.appspot.com/article/" + src + "/" + id;
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articles: data["content"],
                    loading: false
                });
                console.log(data);
            })
            .catch(err => {
                console.log("fetch error", err);
            });
    };

    componentDidMount() {
        this.fetchArticles("nyt", this.state.id);
    }

    render() {
        return (<>
            {this.state.loading ?
                <MyBounceLoader /> :
                <p>done</p>}</>
        );
    }
}


export default ArticleContent;
