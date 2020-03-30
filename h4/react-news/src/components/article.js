import React from "react";
import {Card, Row, Col, Image} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import MyBadge from "./badge";
import MyShare from "./share";

function ArticleCard(props) {
    let history = useHistory();

    function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        history.push("/article?id=" + props.article.id);
    }

    return (
        <Card className="shadow m-3" style={{cursor: "pointer"}} onClick={(e) => handleClick(e)}>
            <Card.Body>
                <Row>
                    <Col xs={12} sm={4} md={3} xl={2}>
                    <Image src={props.article.image} thumbnail/>
                    </Col>
                    <Col xs={12} sm={8} md={9} xl={10}>
                    <Card.Title className={"font-italic font-weight-bold"}>
                        {props.article.title}
                        <MyShare title={props.article.title} url={props.article.url}/>
                    </Card.Title>
                    <Card.Text>
                        <TextTruncate element={"span"} line={3} text={props.article.description} />
                    </Card.Text>
                    <Card.Text>
                        <span className={"font-italic "}>{props.article.date.slice(0, 10)}</span>
                        <MyBadge className={"float-right"}  text={props.article.section}/>
                    </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ArticleCard;
