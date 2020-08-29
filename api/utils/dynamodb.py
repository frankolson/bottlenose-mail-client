import boto3
import datetime
import uuid

def get_resource():
  """
  Returns the dynamoDB boto3 client
  """

  return boto3.resource('dynamodb', region_name='us-east-1')

def create_inbox():
  """
  Creates and returns an inbox with boto3
  """

  dynamodb = get_resource()
  table = dynamodb.Table('inboxes')
  inbox_id = uuid.uuid4().hex
  new_inbox = {
    'id': inbox_id,
    'email_address': inbox_id[:8] + '@bottlenosemail.com',
    'created_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'expires_at': (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1)).isoformat(),
    'emails': []
  }

  table.put_item(Item = new_inbox)

  return new_inbox

def find_inbox(inbox_id: str):
  """
  Finds and returns an inbox with boto3
  """

  dynamodb = get_resource()
  table = dynamodb.Table('inboxes')

  try:
      response = table.get_item(Key={ 'id': inbox_id })
  except ClientError as error:
      print(error.response['Error']['Message'])
  else:
      return response['Item']

def find_email(inbox_id: str, email_id: str):
  """
  Finds and returns an email from an inbox with boto3
  """

  dynamodb = get_resource()
  table = dynamodb.Table('inboxes')

  try:
      response = table.get_item(Key={ 'id': inbox_id })
      email = None

      for inbox_email in response['Item']['emails']:
        if inbox_email['id'] == email_id:
            email = inbox_email
            break

      response['Item']['emails']
  except ClientError as error:
      print(error.response['Error']['Message'])
  else:
      return email