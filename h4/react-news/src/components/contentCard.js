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

class ContentCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {article} = this.props;
        return <><Card className={"shadow m-3"}>
            <Card.Body>
                <Card.Title className={"font-italic font-weight-bold"}>{this.props.article.title}</Card.Title>
                <Card.Subtitle className="font-italic">
                    {this.props.article.date.slice(0, 10)}
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
                </Card.Subtitle>
                <Card.Img variant={"top"} src={this.props.article.image}/>
                <Card.Text>
                    {this.props.article.description}
                </Card.Text>
                {/*<Card.Link href="#">Card Link</Card.Link>*/}
                {/*<Card.Link href="#">Another Link</Card.Link>*/}
            </Card.Body>
        </Card><MyCommentBox/>
        </>
    }
}

export default ContentCard;