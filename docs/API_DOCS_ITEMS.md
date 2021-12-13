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