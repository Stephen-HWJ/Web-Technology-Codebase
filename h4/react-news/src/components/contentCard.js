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
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {Element, Link} from 'react-scroll';

class ContentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
        this.myRef = React.createRef()
    }

    expandClick = () => {
        // if (this.state.expanded) {
        //     window.scrollTo({top: 0, left: 1, behavior: 'smooth' });
        // }
        this.setState({expanded: !this.state.expanded});
        if (!this.state.expanded) {
            this.myRef.current.scrollIntoView({behavior: "smooth"});
        } else {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }
    };

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
                <Card.Text ref={this.myRef} >
                    {this.state.expanded ?
                        article.description :
                        <TextTruncate line={6} element={"span"} truncateText="…" text={article.description}/>}
                </Card.Text>
                <div className={"float-right"} onClick={this.expandClick}>
                    {this.state.expanded ? <MdExpandLess  size={"2em"}/> : <MdExpandMore size={"2em"}/> }
                </div>
            </Card.Body>
        </Card><MyCommentBox id={this.props.id} />
        </>
    }
}

export default ContentCard;