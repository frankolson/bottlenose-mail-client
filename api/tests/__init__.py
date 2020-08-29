from utils.dynamodb import get_resource
from moto import mock_dynamodb2
import datetime
import json

INBOX_ID = '259b6c00a0b54e35adb199916a6d3897'
EMAIL_ADDRESS = '259b6c00@bottlenosemail.com'
FIRST_EMAIL_ID = '32f322ad3f9d4a3b93a38d3555a7634e'

@mock_dynamodb2
def initialize_inboxes_table():
    dynamodb = get_resource()
    table = dynamodb.create_table(
        TableName='inboxes',
        KeySchema=[
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    )

    table.meta.client.get_waiter('table_exists').wait(TableName='inboxes')

    table.put_item(Item = {
        'id': INBOX_ID,
        'email_address': EMAIL_ADDRESS,
        'created_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'expires_at': (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1)).isoformat(),
        'emails': [
            {
                'id': FIRST_EMAIL_ID,
                'inbox_id': INBOX_ID,
                'received_at': (datetime.datetime.now(datetime.timezone.utc)).isoformat(),
                'from': 'example@email.com',
                'subject': 'Test Email',
                'body_html': '<h1>Hi!</h1>',
                'body_plain': 'Hi!',
                'attachments': []
            }
        ]
    })

def api_gateway_event(options: dict = {}) -> dict:
    return {
        'resource': '',
        'path': '',
        'httpMethod': '',
        'headers': {},
        'requestContext': {
            'resourcePath': '',
            'httpMethod': ''
        },
        'pathParameters': options.get('pathParameters', None),
        'body': json.dumps(
            options.get('body', {})
        )
    }