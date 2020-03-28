import React from "react";
import Card from "react-bootstrap/card";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import TextTruncate from 'react-text-truncate'
import MyCommentBox from "./comment";
import MyBookmarkIcon from "./bookmark";

class ContentCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {article} = this.props;
        console.log(article);
        return <><Card className={"shadow m-3"}>
            <Card.Body>
                <Card.Title className={"font-italic font-weight-bold"}>{article.title}</Card.Title>
                <Card.Subtitle className="font-italic">
                    {article.date.slice(0, 10)}
                    <FacebookShareButton
                        url={article.url}
                        hashtag={"#CSCI_571_NewsApp"}
                    >
                        <FacebookIcon size={28} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={article.url}
                                        hashtags={["CSCI_571_NewsApp"]}>
                        <TwitterIcon size={28} round/>
                    </TwitterShareButton>
                    <EmailShareButton url={article.url}
                                      subject={"#CSCI_571_NewsApp"}
                    >
                        <EmailIcon size={28} round/>
                    </EmailShareButton>
                    <MyBookmarkIcon article={article} id={this.props.id} section={this.props.section}/>
                </Card.Subtitle>
                <Card.Img variant={"top"} src={article.image}/>
                <Card.Text>
                    <TextTruncate line={6} element={"span"} truncateText="…" text={article.description}/>
                </Card.Text>
            </Card.Body>
        </Card><MyCommentBox id={this.props.id} />
        </>
    }
}

export default ContentCard;