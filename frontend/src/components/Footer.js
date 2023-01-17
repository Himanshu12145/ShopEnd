import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 text-white">
            <span className="text-info">Copyright</span>{" "}
            <span className="text-secondary">&copy;</span> ShopEnd
            <br></br> <span className="text-secondary"> Made with</span> 💕{" "}
            <span className="text-secondary">Himanshu Shekhar Sahoo</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
