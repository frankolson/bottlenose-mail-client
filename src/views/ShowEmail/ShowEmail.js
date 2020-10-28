import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button, Spinner, InputGroup, FormControl, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { CopyToClipboard } from 'react-copy-to-clipboard';  // references https://www.npmjs.com/package/react-copy-to-clipboard
import moment from "moment";
import sanitizeHtml from "sanitize-html";


export default function ShowEmail({ match }) {
  const [email, setEmail] = useState(null);

  const [copy, setCopy] = useState(false);
  const target = useRef(null);

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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email Address:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={email.emailAddress} readOnly />
            <InputGroup.Append>
              <CopyToClipboard text={email.emailAddress} onCopy={() => setCopy(true)}>
                <Button ref={target} onClick={() => setCopy(!copy)} variant="secondary">Copy</Button>
              </CopyToClipboard>
              <Overlay target={target.current} show={copy} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied!
                  </Tooltip>
                )}
              </Overlay>
            </InputGroup.Append>
            {/* {copy ? <span style={{ color: "red" }}>Copied.</span> : null} */}
          </InputGroup>
          <h6 className="text-center"><em>*Reminder* To see new emails, please refresh your inbox.</em></h6>
          <br />
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
