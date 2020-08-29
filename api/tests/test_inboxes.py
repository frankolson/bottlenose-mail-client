from lambdas.inboxes import show, create
from utils.dynamodb import create_inbox
from tests import *
import unittest
import json

class InboxesTestCase(unittest.TestCase):

    @mock_dynamodb2
    def test_inboxes_show(self):
        initialize_inboxes_table()

        response = show(api_gateway_event({ 'pathParameters': { 'id': INBOX_ID } }), None)
        response_body = json.loads(response['body'])

        self.validate_inbox_response_structure(response, response_body)
        self.assertTrue(response_body['id'] == INBOX_ID)

    @mock_dynamodb2
    def test_inboxes_create(self):
        initialize_inboxes_table()

        response = create(api_gateway_event({}), None)
        response_body = json.loads(response['body'])

        self.validate_inbox_response_structure(response, response_body)

    def validate_inbox_response_structure(self, response, response_body):
        self.assertTrue(response['statusCode'] == 200)
        self.assertTrue('id' in response_body)
        self.assertTrue('email_address' in response_body)
        self.assertTrue('created_at' in response_body)
        self.assertTrue('expires_at' in response_body)
        self.assertTrue('emails' in response_body)
