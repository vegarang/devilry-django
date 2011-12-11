def post_to_create(request, id, input_data):
    if request.method == "POST":
        return "create", input_data


def get_with_id_to_read(request, id, input_data):
    if request.method == "GET" and id != None:
        input_data['id'] = id
        return "read", input_data


def get_without_id_to_list(request, id, input_data):
    if request.method == "GET" and id == None:
        return "list", input_data


def put_with_id_to_update(request, id, input_data):
    if request.method == "UPDATE" and id != None:
        input_data['id'] = id
        return "update", input_data


def put_without_id_to_batch(request, id, input_data):
    if request.method == "UPDATE" and id == None:
        return "batch", input_data


def delete_to_delete(request, id, input_data):
    if request.method == "DELETE":
        input_data['id'] = id
        return "delete", input_data