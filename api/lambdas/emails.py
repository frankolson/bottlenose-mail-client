import json
from utils.dynamodb import find_email


def show(event, context):
    email = find_email(
        event['pathParameters']['inbox_id'],
        event['pathParameters']['id'],
    )

    return {
        "statusCode": 200,
        "body": json.dumps(email)
    }
