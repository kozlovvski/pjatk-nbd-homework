1.

- curl -XPOST -H "Content-Type: application/json" -d '{"id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz"}' -i http://localhost:8098/buckets/s25873/keys/
- curl -XPOST -H "Content-Type: application/json" -d '{"id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv"}' -i http://localhost:8098/buckets/s25873/keys/
- curl -XPOST -H "Content-Type: application/json" -d '{ "id": 3, "name": "Clementine Bauch", "username": "Samantha", "email": "Nathan@yesenia.net"}' -i http://localhost:8098/buckets/s25873/keys/
- curl -XPOST -H "Content-Type: application/json" -d '{"id": 4, "name": "Patricia Lebsack", "username": "Karianne", "email": "Julianne.OConner@kory.org"}' -i http://localhost:8098/buckets/s25873/keys/
- curl -XPOST -H "Content-Type: application/json" -d '{"id": 5, "name": "Chelsey Dietrich", "username": "Kamren", "email": "Lucio_Hettinger@annie.ca"}' -i http://localhost:8098/buckets/s25873/keys/

2. curl -i http://localhost:8098/buckets/s25873/keys/SMO9GFVsD2Ez5tG04HezSRT1qEU

3. curl -XPUT -H "Content-Type: application/json" -d '{"id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "alive": true}' -i http://localhost:8098/buckets/s25873/keys/SMO9GFVsD2Ez5tG04HezSRT1qEU
