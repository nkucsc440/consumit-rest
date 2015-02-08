# Consumit REST API

Consumit's data model consists of two models connected by a many-to-many relationship.

  - Users
  - Consumables

## User

#### List users
```js
$.ajax({
    url: '[domain]/api/users',
    type: 'GET',
    dataType: 'json'
});
```
Response:
```json
{
  "users": [
    {
      "_id": "54d6cd6fa3e65a6001000001",
      "email": "bob@gmail.com",
      "__v": 0
    },
    {
      "_id": "54d6ce1f9446356c0b000001",
      "email": "bob@gmail.com",
      "__v": 0
    },
    {
      "_id": "54d6ce268e7fd4280d000001",
      "email": "bob@gmail.com",
      "firstName": "Bob",
      "lastName": "Smith",
      "__v": 0
    }
  ]
}
```

#### Add a user
```js
$.ajax({
	url: '[domain]/api/users',
	type: 'POST',
	dataType: 'json',
	data: { user: {
            email: "bob@gmail.com",
            firstName: "Bobby",
            lastName: "Smith"
        }
    }
});
```
Response:
```json
{
    "user": {
        "__v": 0,
        "email": "bob@gmail.com",
        "firstName": "Bobby",
        "lastName": "Smith",
        "_id": "54d6f535f5a1470300000010"
    }
}
```

#### Update a user
```js
$.ajax({
	url: '[domain]/api/users/[userid]',
	type: 'PUT',
	dataType: 'json',
	data: { user: {
            email: "bob@gmail.com",
            firstName: "Robert",
            lastName: "Smith"
        }
    }
});
```
Response:
```json
{
    "user": {
        "_id": "[userid]",
        email: "bob@gmail.com",
        "__v": 0,
        firstName: "Robert",
        lastName: "Smith"
    }
}
```

#### Delete a user
```js
$.ajax({
    url: '[domain]/api/users/[userid]',
    type: 'DELETE',
    dataType: 'json'
});
```
Response:
```
OK
```

