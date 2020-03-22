import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { IoMdShare } from "react-icons/io";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, EmailIcon, EmailShareButton } from "react-share";

function MyShare(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <IoMdShare onClick={handleShow}>
            </IoMdShare>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={"h5"}>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"text-center"}>
                    <h5>Share via</h5>
                    <Row><Col>
                    <FacebookShareButton
                        url={props.url}
                        hashtag={"#CSCI_571_NewsApp"}
                    >
                        <FacebookIcon size={60} round />
                    </FacebookShareButton></Col><Col>
                    <TwitterShareButton url={props.url}
                                        hashtags={["CSCI_571_NewsApp"]}>
                        <TwitterIcon size={60} round/>
                    </TwitterShareButton></Col><Col>
                    <EmailShareButton url={props.url}
                                      subject={"#CSCI_571_NewsApp"}
                    >
                        <EmailIcon size={60} round/>
                    </EmailShareButton></Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyShare;
