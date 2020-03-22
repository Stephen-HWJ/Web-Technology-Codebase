import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import TextTruncate from 'react-text-truncate';
import MyBadge from "./badge";
import "../css/article.css"

function Article(props) {
    return (
        <Card className="article shadow m-3">
            <Card.Body>
                <Row>
                    <Col xs={12} md={3}>
                    <Image src={props.article.image} thumbnail/>
                    </Col>
                    <Col xs={12} md={9}>
                    <Card.Title className={"font-italic font-weight-bold"}>{props.article.title}</Card.Title>
                    <Card.Text>
                        <TextTruncate element={"span"} line={3} text={props.article.description} />
                    </Card.Text>
                    <Card.Text>
                        <span className={"font-italic"}>{props.article.date.slice(0, 10)}</span>
                        <MyBadge text={props.article.section}/>
                    </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Article;
