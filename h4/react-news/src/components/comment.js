import React from "react";
import commentBox from "commentbox.io";

class MyCommentBox extends React.Component {
    componentDidMount() {
        this.removeCommentBox = commentBox("5669785102712832-proj");
        // this.removeCommentBox = commentBox("5631219517620224-proj");
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }
}

export default MyCommentBox;