import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import moment from "moment";

export default function Inbox({ match }) {
  const [inbox, setInbox] = useState(null);
  const [emails, setEmails] = useState([]);

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
  }, []);

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
          <h4 className="text-center">Email Address: {inbox.emailAddress}.</h4>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Sender</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => {
                return (
                  <tr>
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
    return <p className="text-center">Loading...</p>;
  }

  return <div className="inbox">{inbox ? renderInbox() : renderLoading()}</div>;
}
