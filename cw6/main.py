from riak import RiakClient

client = RiakClient(nodes=[{'host': 'localhost', 'http_port': 8089}])
bucket = client.bucket('s25873')
doc_name = 'doc1'
new_document = {
    'foo': 'bar'
}

# create
try:
    bucket.new(doc_name, data=new_document,
               content_type="application/json").store()
except:
    print(f'Error while creating the {doc_name} document')

# read
try:
    doc1 = bucket.get(doc_name)
    print(f'{doc_name} content: {doc1.data}')
except:
    print(f'Error while reading the {doc_name} document')

# update
try:
    doc1.data['foo'] = 'baz'
    doc1.store()
except:
    print(f'Error while updating the {doc_name} document')

# read again
try:
    doc1 = bucket.get(doc_name)
    print(f'{doc_name} new content: {doc1.data}')
except:
    print(f'Error while reading the {doc_name} document')

# delete
try:
    doc1.delete()
except:
    print(f'Error while deleting the {doc_name} document')

# read once more
try:
    doc1 = bucket.get(doc_name)
    print(f'{doc_name} newest content: {doc1.data}')
except:
    print(f'Error while reading the {doc_name} document')
