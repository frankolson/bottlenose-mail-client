import json
from utils.dynamodb import create_inbox, find_inbox

def show(event, context):
    inbox = find_inbox(event['pathParameters']['id'])

    return {
        "statusCode": 200,
        "body": json.dumps(inbox)
    }

def create(event, context):
    inbox = create_inbox()

    return {
        "statusCode": 200,
        "body": json.dumps(inbox)
    }