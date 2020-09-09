import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function Inbox({ match }) {
  return (
    <Row as="main">
      <Col>
        <Form.Group controlId="exampleForm.ControlTextarea1" sm>
          <Form.Label style={{ color: "black" }}>Inbox</Form.Label>
          <Form.Control as="textarea" rows="6" />
        </Form.Group>
      </Col>
    </Row>
  );
}
