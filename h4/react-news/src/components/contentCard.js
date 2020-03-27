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
import MyCommentBox from "./comment";
import MyBookmarkIcon from "./bookmark";

class ContentCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {article} = this.props;
        return <><Card className={"shadow m-3"}>
            <Card.Body>
                <Card.Title className={"font-italic font-weight-bold"}>{article.title}</Card.Title>
                <Card.Subtitle className="font-italic">
                    {article.date.slice(0, 10)}
                    {/*@TODO: change the url for share*/}
                    <FacebookShareButton
                        url={"https://github.com/"}
                        hashtag={"#CSCI_571_NewsApp"}
                    >
                        <FacebookIcon size={28} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={"https://github.com/"}
                                        hashtags={["CSCI_571_NewsApp"]}>
                        <TwitterIcon size={28} round/>
                    </TwitterShareButton>
                    <EmailShareButton url={"https://github.com/"}
                                      subject={"#CSCI_571_NewsApp"}
                    >
                        <EmailIcon size={28} round/>
                    </EmailShareButton>
                    <MyBookmarkIcon id={this.props.id}/>
                </Card.Subtitle>
                <Card.Img variant={"top"} src={article.image}/>
                <Card.Text>
                    {article.description}
                </Card.Text>
            </Card.Body>
        </Card><MyCommentBox id={this.props.id} />
        </>
    }
}

export default ContentCard;