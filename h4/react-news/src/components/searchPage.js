import React from "react";
import MyBounceLoader from "./loader";
import SearchCard from "./searchCard";
import { Row, Col } from 'react-bootstrap';

class SearchPage extends React.Component {
    state = {
        keyword: this.props.location.search.slice(2,),
        loading: true,
        articles: [],
    };

    fetchArticles (src, keyword) {
        let fetchUrl = `https://nodejs-hwj.appspot.com/search/${src}/${keyword}`;
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articles: this.state.articles.concat(data["search"]),
                    loading: false,
                });
                // console.log(this.state.articles);
            }, err => {
                console.log("fetch error", err);
            });
    };

    componentDidMount() {
        this.fetchArticles(localStorage.getItem("news_src"), this.state.keyword);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setState({keyword: nextProps.location.search.slice(2,), loading: true, articles: []});
        this.fetchArticles(localStorage.getItem("news_src"), nextProps.location.search.slice(2,));
    }

    render(){

        return (<><Row className={"p-3"}><Col xs={12}>
                <p className={"h4"}>Results</p></Col>{this.state.loading ?
                <MyBounceLoader /> :
                this.state.articles.map((article, index) =>
                    <Col xs={12} sm={6} md={4} lg={3} key={index} style={{padding: '0'}} >
                    <SearchCard article={article} /></Col>)

            }</Row></>
        );
    };
}

export default SearchPage;
