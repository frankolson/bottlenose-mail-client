import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import moment from "moment";
import styles from "./mystyle.module.css";
import sanitizeHtml from "sanitize-html";

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
  }, []);

  function loadEmail(emailId) {
    return API.get("bottlenose", `/emails/${emailId}`);
  }

  function renderEmail() {
    return (
      <Row as="main">
        <Col>
          <p className="text-center">Here is email: {email.emailAddress}.</p>
          <Card>
            <Card.Header>
              <Link to={`/inboxes/${email.inboxId}`}>
                <Button variant="primary">Back</Button>
              </Link>

              <h1 className={styles.title}>Subject: {email.subject}</h1>
              <Card.Title className={styles.title}>
                From: {email.from}
                <br />
                Sent: {moment(email.date).format("lll")}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(email.bodyHtml),
                  }}
                />
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">Attachments:</Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
  function renderLoading() {
    return <p className="text-center">Loading...</p>;
  }
  return <div className="email">{email ? renderEmail() : renderLoading()}</div>;
}
