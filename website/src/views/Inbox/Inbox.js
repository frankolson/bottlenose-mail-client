import React from "react";
import { Row, Col, Table } from "react-bootstrap";

export default function Inbox({ match }) {
  return (
    <Row as="main">
      <Col>
        <p className="text-center">Here is inbox: {match.params.inbox}.</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark Otto</td>
              <td>Project for Charity</td>
              <td>11:30am</td>
            </tr>
            <tr>
              <td>Jacob Thornton</td>
              <td>BUY ONE GET ANOTHER FREE!!!</td>
              <td>10:30am</td>
            </tr>
            <tr>
              <td>Larry Bird</td>
              <td>Pick-up Basketball Invitation</td>
              <td>2:30pm</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
