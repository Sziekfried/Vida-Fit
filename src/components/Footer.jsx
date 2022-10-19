import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import insta from "../assets/iconos/instagram.svg";
import fb from "../assets/iconos/facebook.svg";
import yb from "../assets/iconos/youtube.svg";
import tk from "../assets/iconos/tiktok.svg";

function Footer() {
  return (
    <div className="footer">
      <Container className="pb-2">
        <Row>
          <Col className="text-center">
            <Image src={insta} className="ico-footer"/>
          </Col>
          <Col className="text-center">
            <Image src={fb} className="ico-footer"/>
          </Col>
          <Col className="text-center">
            <Image src={yb} className="ico-footer"/>
          </Col>
          <Col className="text-center">
            <Image src={tk} className="ico-footer"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
