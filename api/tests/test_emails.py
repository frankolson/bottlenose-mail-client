from lambdas.emails import *
from tests import *

def test_emails_show():
    resp = show(api_gateway_event({}), None)
    assert resp == {'statusCode': 200, 'body': '"Hello Python"'}