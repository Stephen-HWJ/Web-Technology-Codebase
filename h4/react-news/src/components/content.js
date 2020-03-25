import React from "react";
import MyBounceLoader from "./loader";
import ContentCard from "./contentCard";

class ArticleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.location.search.slice(4,),
            article: NaN,
        }
    }

    fetchArticles (src, id) {
        let fetchUrl = "https://nodejs-hwj.appspot.com/article/" + src + "/" + id;
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    article: data["content"],
                    loading: false
                });
                console.log(this.state);
            })
            .catch(err => {
                console.log("fetch error", err);
            });
    };

    componentDidMount() {
        this.fetchArticles(localStorage.getItem("news_src"), this.state.id);
    }

    render() {
        return (<>{this.state.loading ?
                    <MyBounceLoader /> :
                    <ContentCard article={this.state.article} id={this.state.id}/>
                }</>
        );
    }
}


export default ArticleContent;
