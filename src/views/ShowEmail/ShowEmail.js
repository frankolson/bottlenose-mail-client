import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function ShowEmail({ match }) {
  return (
    <Row as="main">
      <Col>
        <p className="text-center">
          Here is email: {match.params.email}.
        </p>
      </Col>
    </Row>
  );
}