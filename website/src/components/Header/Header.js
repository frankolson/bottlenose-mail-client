import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default function Heaser() {
  return (
    <Row className="text-center mb-5">
      <Col>
        <h1>
          This is BottlenoseMail!
        </h1>

        <Button href="#">Create New Inbox</Button>
      </Col>
    </Row>
  );
}