import React from "react";
import TextTruncate from "react-text-truncate";

class ContentTruncate extends React.Component{
    componentDidMount(): void {
        this.props.isTruncate();
    }

    render(){
        return <TextTruncate line={6} element={"span"} truncateText="…" text={this.props.text}/>
    }
}

export default ContentTruncate;