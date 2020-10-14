import React from "react";
import { Row, Col, Button, Jumbotron, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";

export default function Header() {
  let history = useHistory();

  function createInbox() {
    return API.post("bottlenose", `/inboxes`).then((newInbox) =>
      history.push(`/inboxes/${newInbox.inboxId}`)
    );
  }

  return (
    <Row className="text-center mb-5">
      <Col>
        <Jumbotron>
          <Container>
            <h1 className="display-4">Bottlenose Mail</h1>
            <p className="lead" style={{ color: "black" }}>
              Forget about spam, advertising mailings, hacking and attacking
              robots. Keep your real mailbox clean and secure. Bottlenose Mail
              provides a temporary, secure, anonymous, free, disposable email
              address.
            </p>
            <br />
          </Container>
        </Jumbotron>
        <Button onClick={createInbox}>Create New Inbox</Button>
      </Col>
    </Row>
  );
}
