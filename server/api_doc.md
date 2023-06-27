# Recommendtify API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`

- `GET /spotify/login`
- `GET /spotify/callback`
- `GET /spotify/profile`
- `GET /spotify/topArtists`
- `GET /spotify/topTracks`
- `GET /spotify/recommend`
- `GET /spotify/detailTrack/:id`

- `GET /myMusic`
- `POST /myMusic`
- `PATCH /myMusic/:id`

- `POST /generate-midtrans/:id`

&nbsp;

## 1. POST /login

Description:

- Login from database for user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token_app": "string"
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Invalid email/password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. POST /register

Description:

- Register for user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (401 - Unauthenticated)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Invalid email/password"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email must be unique"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /spotify/login

Description:

- Get authorization url for spotify login

Request:

_Response (200 - OK)_

```json
{
  "authorizationUrl": "string",
},
```

&nbsp;

## 4. GET /spotify/callback

Description:

- Get access token from spotify API

Request:

- headers:

```json
{
  "code": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. GET /spotify/profile

Description:

- Get spotify profile

Request:

- headers:

```json
{
  "access_token_app": "string",
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "username": "rizalsyamsul99",
  "name": "jal",
  "imageUrl": "https://i.scdn.co/image/ab6775700000ee85cbbef90917cb338d857f3994"
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 6. GET /spotify/topArtists

Description:

- Get Top artists from logged spotify user

Request:

- headers:

```json
{
  "access_token_app": "string",
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "2aaLAng2L2aWD2FClzwiep",
    "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb881f3d1db94c120edca60a65",
    "name": "Dream Theater",
    "genres": ["hard rock", "metal", "progressive metal"]
  },
  ...
]
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 7. GET /spotify/topTracks

Description:

- Get Top tracks from logged spotify user

Request:

- headers:

```json
{
  "access_token_app": "string",
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {

    "id": "5ih5d9WJSI7Hxz0KIPJPY2",
    "name": "Yen",
    "preview": "https://p.scdn.co/mp3-preview/176e53853a7506ce36159c592c89b35ae4fb3b8e?cid=03104830d4de495d9d22eb0616d9e38a",
    "href": "https://api.spotify.com/v1/tracks/5ih5d9WJSI7Hxz0KIPJPY2",
    "album": {
      "id": "3hWTXO0w02D6YpVRyLRmQz",
      "name": "The End, So Far",
      "imageUrl":"https://i.scdn.co/image ab67616d0000b273c3eedff14af24fdd988ed1a7"
    },
    "artist": {
      "id": "05fG473iIaoy82BF1aGhL8",
      "name": "Slipknot"
    }
  },
  ...
]
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 8. GET /spotify/recommend

Description:

- Get recommendded tracks from logged spotify user

Request:

- headers:

```json
{
  "access_token_app": "string",
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {

    "id": "0RmvXwM1f0aBJbqbRMk9Tb",
    "name": "Late Redemption",
    "preview": "https://p.scdn.co/mp3-preview/176e53853a7506ce36159c592c89b35ae4fb3b8e?cid=03104830d4de495d9d22eb0616d9e38a",
    "album": {
      "id": "2KAXVCgmYm1vmmiULYFFwl",
      "name": "Temple Of Shadows",
      "imageUrl": "https://i.scdn.co/image/ab67616d0000b2738eae5999510efa9a6abf568a"
    },
    "artist": {
      "id": "7IAXZaLTb6nkJr8RmVPn5y",
      "name": "ANGRA"
    }
  },
  ...
]
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 9. GET /spotify/detailTrack/:id

Description:

- Get detail tracks of one song with spotifyId

Request:

- headers:

```json
{
  "access_token_app": "string",
  "access_token": "string"
}
```

- params:

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "5ih5d9WJSI7Hxz0KIPJPY2",
  "name": "Yen",
  "preview": "https://p.scdn.co/mp3-preview/176e53853a7506ce36159c592c89b35ae4fb3b8e?cid=03104830d4de495d9d22eb0616d9e38a",
  "href": "https://api.spotify.com/v1/tracks/5ih5d9WJSI7Hxz0KIPJPY2",
  "album": {
    "id": "3hWTXO0w02D6YpVRyLRmQz",
    "name": "The End, So Far",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273c3eedff14af24fdd988ed1a7"
  },
  "artist": {
    "id": "05fG473iIaoy82BF1aGhL8",
    "name": "Slipknot"
  }
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 10. GET /myMusic

Description:

- Get all album from database where user logged in

Request:

- headers:

```json
{
  "access_token_app": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Mata Hati Telinga",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2734b274090757829034de581df",
    "price": 917684,
    "spotifyId": "1DynZXJq0QLlWT4LYLBDxC",
    "artistName": "MALIQ & D'Essentials",
    "UserId": 2,
    "status": true,
    "createdAt": "2023-06-07T15:01:19.957Z",
    "updatedAt": "2023-06-07T15:01:24.011Z"
  },
  ...
]
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 11. POST /myMusic

Description:

- Add new album to music table to buy for user

Request:

- headers:

```json
{
  "access_token_app": "string"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "spotifyId": "string",
  "artistName": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "name": "Mata Hati Telinga",
  "imageUrl": "https://i.scdn.co/image/ab67616d0000b2734b274090757829034de581df",
  "price": 917684,
  "spotifyId": "1DynZXJq0QLlWT4LYLBDxC",
  "artistName": "MALIQ & D'Essentials",
  "UserId": 2,
  "status": true,
  "createdAt": "2023-06-07T15:01:19.957Z",
  "updatedAt": "2023-06-07T15:01:24.011Z"
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 12. PATCH /myMusic/:id

Description:

- Change status in album from false(Unpaid) to true(Paid) where user logged in

Request:

- headers:

```json
{
  "access_token_app": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Album has been Paid"
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "msg": "Internal Server Error"
}
```

&nbsp;

## 13. POST /generate-midtrans/:id

Description:

- Generate Token from Midtrans API where id is selected

Request:

- headers:

```json
{
  "access_token_app": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "midtransToken": {
    "token": "cf40c27f-58bb-46b5-9cd5-c4a1f4dbc61c",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/cf40c27f-58bb-46b5-9cd5-c4a1f4dbc61c"
  }
}
```

_Response (400 - Bad Request, MidtransError)_

```json
{
  "message": "You've Already Paid"
}
OR
{
  "message": "error"
}
```

_Response (401 - Unauthenticated - JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;
