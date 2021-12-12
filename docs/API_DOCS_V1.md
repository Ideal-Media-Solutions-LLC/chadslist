# Rest API

## Item Endpoints

|Method|path|description|
|----|----|----|
|GET|`/items`|Get all items within a designated radius of a designated location|

### Request Query Parameters
Parameters to be passed using query parameters
| Parameter |   Type  | Description | Requirement Type | Default Value |
| --- | --- | --- | --- | --- |
| longitude | float | Longitude to be searched from. | Required | |
| latitude | float | Latitude to be searched from. | Required | |
| userId | integer | Signed in user if available. | Optional | 0 |
| radius | integer | Radius that is to be searched within | Optional | 10 |

### _Example Request URL_

```
'/items/?userId=21&radius=10&latitude=40.72557420158411&longitude=-74.01148541130824'
```

### _Example Request_

```javascript
EXAMPLE NEEDED
```

### _Example Response_
```json
[
  {
      "id": 11,
      "name": "Licensed Granite Salad",
      "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      "imageUrl": "http://placeimg.com/640/480/fashion",
      "longitude": -74.068710050618,
      "latitude": 40.762499145128,
      "status": "unclaimed",
      "category": "Hobbies",
      "donorId": 23,
      "createdAt": "2021-12-12T18:57:03.514Z"
  },
  {
      "id": 23,
      "name": "Rustic Plastic Bike",
      "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      "imageUrl": "http://placeimg.com/640/480/fashion",
      "longitude": -74.152020772283,
      "latitude": 40.799124367346,
      "status": "unclaimed",
      "category": "Electronics",
      "donorId": 9,
      "createdAt": "2021-12-12T18:57:03.514Z"
  }
]
```

***


## Registration Endpoints

|Method|path|description|
|----|----|----|
|POST|`/auth/register`|Register a new user in the database|


***

## Login Endpoints

|Method|path|description|
|----|----|----|
|POST|`/auth/login`|Login a user if they exist and send an auth token back|


***

## Chat Endpoints

|Method|path|description|
|----|----|----|
|POST|`/chat`|Start a chat between two users|
|POST|`/chat/message`|Post a new message to the database|
|GET|`/chat/message`|Get all messages? (Not currently set up)|


***

## Claim Endpoints

|Method|path|description|
|----|----|----|
|POST|`/claims`|Mark an item as claimed|
|DELETE|`/claims`|Mark an item as not claimed|



***

## Index Cards
Shows all cards belonging to a list.

### Authentication
Requires session cookie.

### URL
`GET /cards`

### Request Form Data
| Parameter |   Type  | Description | Requirement Type |
| --- | --- | --- | --- |
| list_id | integer | ID of the list that owns the cards. | Required |

### _Example Request_

```javascript
let formData = new FormData();
formData.append(card["list_id"], 1);

fetch(`http://localhost:3000/cards`, {
    credentials: 'include',
    method: 'get',
    body: formData
}).then(response => response.json())
  .then(json => ...);
```

### Response
| Parameter |   Type  | Description |
| --- | --- | --- |
| card_id | integer | ID of the requested card. |
| list_id | integer | List ID of the requested card. |
| name | string | Name of the requested card. |
| content | string | Content of the requested card. |

### _Example Response_

```json
[
  {
    "card_id": 1,
    "list_id": 1,
    "name": "My Card",
    "content": "My Content"
  },
  {
    "card_id": 2,
    "list_id": 1,
    "name": "My Second Card",
    "content": "My Content"
  }
]
```
