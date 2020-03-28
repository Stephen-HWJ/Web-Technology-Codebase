import React from "react";
import Badge from "react-bootstrap/badge";

let backgroundColorJson = {
    "world": "rgb(124, 78, 255)",
    "politics": "rgb(65, 148, 136)",
    "business": "rgb(70, 150, 236)",
    "technology": "rgb(206, 220, 57)",
    "sports": "rgb(246, 194, 68)",
    "other": "rgb(110, 117, 124)",
    "guardian": "rgb(20, 40, 74)",
    "nytimes": "rgb(221, 221, 221)"
};

let textColorJson = {
    "world": "white",
    "politics": "white",
    "business": "white",
    "technology": "black",
    "sports": "black",
    "other": "white",
    "guardian": "white",
    "nytimes": "black"
};


class MyBadge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundStyle: {
                backgroundColor: "rgb(110, 117, 124)",
                color: "white",
            },
            text: "WORLD"
        }
    }

    componentDidMount() {
        let section = this.props.text.toLowerCase();
        if (section === "sport") section = "sports";
        if (backgroundColorJson[section]) {
            this.setState({
                backgroundStyle: {
                    backgroundColor: backgroundColorJson[section],
                    color: textColorJson[section],
                },
                text: section.toUpperCase()
            });
        } else {
            this.setState({
                backgroundStyle: {
                    backgroundColor: backgroundColorJson["other"],
                    color: textColorJson["other"],
                },
                text: section.toUpperCase()
            });
        }
    }

    render() {
        return <Badge className={"float-right"} style={this.state.backgroundStyle} variant={"info"}>{this.state.text}</Badge>;
    }
}

export default MyBadge;
