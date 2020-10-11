import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import moment from "moment";
import sanitizeHtml from "sanitize-html";
import "./styles.css";

export default function ShowEmail({ match }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const retrievedEmail = await loadEmail(match.params.email);
        setEmail(retrievedEmail);
      } catch (error) {
        alert(error);
      }
    }

    onLoad();
  }, [match.params.email]);

  function loadEmail(emailId) {
    return API.get("bottlenose", `/emails/${emailId}`);
  }

  function renderEmail() {
    return (
      <Row as="main">
        <Col>
          <h4 className="text-center">Here is email: {email.emailAddress}</h4>
          <Card>
            <Card.Header>
              <Link to={`/inboxes/${email.inboxId}`}>
                <Button variant="primary">Back</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Subject:</strong> {email.subject}
                <br />
                <strong>From:</strong> {email.from}
                <br />
                <strong>Sent:</strong> {moment(email.date).format("lll")}
              </p>
              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(email.bodyHtml),
                }}
              />
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
  function renderLoading() {
    return <div className="text-center"><Spinner animation="border" variant="dark" /></div>;
  }
  return <div className="email">{email ? renderEmail() : renderLoading()}</div>;
}
