import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Row as="main">
      <Col>
        <p className="text-center">I am the home page.</p>
      </Col>
    </Row>
  );
}