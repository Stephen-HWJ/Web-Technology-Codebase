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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactTooltip from "react-tooltip";

class ContentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            source: this.props.id.slice(0, 4) === "http" ? "nyt" : "guardian"

    };
        this.myRef = React.createRef()
    }

    expandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const {article} = this.props;
        return <><Card className={"shadow m-3"}>
            <Card.Body>
                <Card.Title className={"font-italic h1"}>{article.title}</Card.Title>
                <Card.Subtitle>
                    <Row><Col xs={6} md={10} className={"align-bottom;"}>
                        {article.date.slice(0, 10)}</Col>
                    <Col xs={6} md={2}>
                    <span className={"float-right"}>
                    <FacebookShareButton data-tip="Facebook" data-for={"share"} url={article.url} hashtag={"#CSCI_571_NewsApp"} >
                        <FacebookIcon size={28} round />
                    </FacebookShareButton>
                    <TwitterShareButton data-tip="Twitter" data-for={"share"} url={article.url} hashtags={["CSCI_571_NewsApp"]}>
                        <TwitterIcon size={28} round/>
                    </TwitterShareButton>
                    <EmailShareButton data-tip="Email" data-for={"share"} url={article.url} subject={"#CSCI_571_NewsApp"}>
                        <EmailIcon size={28} round/>
                    </EmailShareButton>
                    <MyBookmarkIcon article={article} id={this.props.id} section={this.props.section}/></span></Col>
                    </Row>
                </Card.Subtitle>
                <Card.Img style={{marginTop: "0.5em"}} variant={"top"} src={article.image}/>
                <Card.Text ref={this.myRef}  id={"test"}>
                    {this.state.expanded || this.state.source === "nyt" ?
                        article.description :
                        <TextTruncate  line={6} element={"span"} truncateText="…" text={article.description}/>}
                </Card.Text>
                {this.state.source === "guardian" ?
                    <a style={{color: "black", cursor: "default"}}
                       className={"float-right"}
                       href={this.state.expanded?"#test":"#head"}
                       onClick={this.expandClick}>
                        {this.state.expanded ? <MdExpandLess  size={"2em"}/> : <MdExpandMore size={"2em"}/> }
                    </a> : null}
            </Card.Body>
        </Card><MyCommentBox id={this.props.id} />
        <ReactTooltip place="top" id={"share"} type="dark" effect="solid"/>
        </>
    }
}

export default ContentCard;