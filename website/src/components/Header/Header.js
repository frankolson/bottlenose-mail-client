import React from "react";
import { Row, Col, Button, Jumbotron } from "react-bootstrap";

export default function Heaser() {
  return (
    <Row className="text-center mb-5">
      <Col>
        <Jumbotron>
          <Container>
            <h1 className="display-4" style={{ color: "black" }}>
              Bottlenose Mail
            </h1>
            <p className="lead" style={{ color: "black" }}>
              Forget about spam, advertising mailings, hacking and attacking
              robots. Keep your real mailbox clean and secure. Bootlenoose Mail
              provides a temporary, secure, anonymous, free, disposable email
              address.
            </p>
            <br />
          </Container>
        </Jumbotron>
        <Button variant="secondary" href="#">
          Create New Inbox
        </Button>
      </Col>
    </Row>
  );
}
