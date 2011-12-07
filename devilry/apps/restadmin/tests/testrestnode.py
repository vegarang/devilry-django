from django.test import TestCase
from dingus import Dingus

from devilry.apps.restadmin import RestNode
from devilry.rest.error import InvalidParameterTypeError

class TestRestNode(TestCase):
    def setUp(self):
        self.nodedao = Dingus()
        self.restnode = RestNode(self.nodedao)

    def test_crud_read(self):
        result = self.restnode.crud_read(10)
        self.assertRaises(InvalidParameterTypeError, self.restnode.crud_read, "invalid")
        self.assertEquals(1, len(self.nodedao.calls("read", 10)))
        result_keys = result.keys()
        self.assertEquals(set(result_keys), set(['long_name', 'etag', 'id', 'short_name']))

    def test_crud_list(self):
        result = self.restnode.crud_list(5)
        self.assertEqual(1, len(self.nodedao.calls("list", 5)))
        result_keys = result['items'][0].keys()
        self.assertEqual(set(result_keys), set(RestNode.read_fields))