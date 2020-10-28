import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Table, Spinner, Button, InputGroup, FormControl, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { CopyToClipboard } from 'react-copy-to-clipboard'; //For refernece: https://www.npmjs.com/package/react-copy-to-clipboard
import moment from "moment";

export default function Inbox({ match }) {
  const [inbox, setInbox] = useState(null);
  const [emails, setEmails] = useState([]);

  const [copy, setCopy] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const retrievedInbox = await loadInbox(match.params.inbox);
        const retrievedEmails = await loadEmails(match.params.inbox);
        setInbox(retrievedInbox);
        setEmails(retrievedEmails);
      } catch (error) {
        alert(error);
      }
    }

    onLoad();
  }, [match.params.inbox]);

  function loadInbox(inboxId) {
    return API.get("bottlenose", `/inboxes/${inboxId}`);
  }

  function loadEmails(inboxId) {
    return API.get("bottlenose", `/emails?inboxId=${inboxId}`);
  }

  function renderInbox() {
    return (
      <Row as="main">
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend variant="dark">
              <InputGroup.Text id="basic-addon1">Email Address:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={inbox.emailAddress} readOnly />
            <InputGroup.Append>
              <CopyToClipboard text={inbox.emailAddress} onCopy={() => setCopy(true)}>
                <Button ref={target} onClick={() => setCopy(!copy)} variant="secondary">Copy</Button>
              </CopyToClipboard>
              <Overlay ref={target.current} show={copy} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied!
                  </Tooltip>
                )}
              </Overlay>
              {/* For Reference https://react-bootstrap.github.io/components/overlays/ */}
            </InputGroup.Append>
            {/* {copy ? <span style={{ color: "red" }}>Copied.</span> : null} */}
          </InputGroup>
          <h6 className="text-center"><em>*Reminder* To see new emails, please refresh your inbox.</em></h6>
          <br />
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Sender</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {emails.length === 0 ? <tr><td className="text-center" colSpan="3">Your Inbox is empty!</td></tr> : null}
              {emails.map((email) => {
                return (
                  <tr key={email.emailId}>
                    <td>
                      <Link to={`/emails/${email.emailId}`}>
                        {email.subject}
                      </Link>
                    </td>
                    <td>{email.from}</td>
                    <td>{moment(email.date).format("lll")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  function renderLoading() {
    return <div className="text-center"><Spinner animation="border" variant="dark" /></div>;
  }

  return <div className="inbox">{inbox ? renderInbox() : renderLoading()}</div>;
}
