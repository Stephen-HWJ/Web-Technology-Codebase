import React, { Component } from "react";

const serverUrl = "https://nodejs-hwj.appspot.com";


class SectionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            section: "home",
            loading: true,
            articles: []
        }
    }

    fetchArticles = (src) => {
        let fetchUrl = serverUrl + "/" + src + "/" + this.state.section;
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data["returnArray"]);
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
        this.fetchArticles("guardian");
    }

    render() {
        return (
            <h1>Show news here!</h1>
        );
    }
}

export default SectionPage;
