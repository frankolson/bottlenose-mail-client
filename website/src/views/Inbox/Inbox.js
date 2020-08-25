import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Inbox({ match }) {
  return (
    <Row as="main">
      <Col>
        <p className="text-center">
          Here is inbox: {match.params.inbox}.
        </p>
      </Col>
    </Row>
  );
}