from lambdas.inboxes import *
from tests import *

def test_inboxes_show():
    resp = show(api_gateway_event({}), None)
    assert resp == {'statusCode': 200, 'body': '"Hello Python"'}

def test_inboxes_create():
    resp = create(api_gateway_event({}), None)
    assert resp == {'statusCode': 200, 'body': '"Hello Python"'}