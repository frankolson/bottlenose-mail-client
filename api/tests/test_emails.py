from lambdas.emails import show
from tests import *
import unittest

class EmailsTestCase(unittest.TestCase):

    @mock_dynamodb2
    def test_emails_show(self):
        initialize_inboxes_table()

        response = show(api_gateway_event({
            'pathParameters': {
                'id': FIRST_EMAIL_ID,
                'inbox_id': INBOX_ID
            }
          }), None)
        response_body = json.loads(response['body'])

        self.assertTrue(response['statusCode'] == 200)
        self.assertTrue('id' in response_body)
        self.assertTrue(response_body['id'] == FIRST_EMAIL_ID)
        self.assertTrue('inbox_id' in response_body)
        self.assertTrue('received_at' in response_body)
        self.assertTrue('from' in response_body)
        self.assertTrue('subject' in response_body)
        self.assertTrue('body_html' in response_body)
        self.assertTrue('body_plain' in response_body)
        self.assertTrue('attachments' in response_body)