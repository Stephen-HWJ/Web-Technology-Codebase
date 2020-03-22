import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import TextTruncate from 'react-text-truncate';
import "../css/article.css"

function Article(props) {
    return (
        <Card className="article shadow m-3">
            <Card.Body>
                <Row>
                    <Col xs={12} md={3}>
                    <Image src={props.image} thumbnail/>
                    </Col>
                    <Col xs={12} md={9}>
                    <Card.Title className={"font-italic font-weight-bold"}>{props.title}</Card.Title>
                    <Card.Text>
                        <TextTruncate line={3} text={props.description} />
                    </Card.Text>
                    <Card.Text className={"font-italic"}>
                        {props.date}
                    </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Article;
