from devilry.apps.core.models.node import Node

class NodeDao(object):
    def read(self, id):
        return Node.objects.get(pk=id)

    def update(self, id, short_name, long_name):
        node = self.read(id)
        node.short_name = short_name
        node.long_name = long_name
        node.save()
        return node

    def create(self, short_name, long_name):
        node = Node(short_name=short_name, long_name=long_name)
        node.save()
        return node

    def delete(self, id):
        node = Node.objects.get(pk=id)
        node.delete()

    def list(self, parentnode):
        return Node.objects.filter(parentnode=parentnode)