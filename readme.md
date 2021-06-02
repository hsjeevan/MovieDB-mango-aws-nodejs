# Movie Database APIs

## Install

Install node dependencies

    npm install

## Update Credentials

Update the `credentials.js` file with the `JWT_KEY` and `MONGO_ATLAS_PW` as provided in the submission email.

Else, replace the mangoDB Url in `app.js` to connect to a different database.

`JWT_KEY` is used in generating tokens for logged in users.

## Start the server

To run the server, use the following code

    npm run start

## Examine REST APIs

Download and use the postman collection export to try out the APIs

[Local server](https://github.com/hsjeevan/MovieDB-mango-aws-nodejs/blob/master/PostmanCollections/MovieDB%20-%20localhost.postman_collection.json)

[Hosted Server](https://github.com/hsjeevan/MovieDB-mango-aws-nodejs/blob/master/PostmanCollections/MovieDB%20-%20AWS.postman_collection.json)

---

**NOTE**
The user access `token` is stored in the postman collection varialbes and is automatically used to make Restricted API calls.

---

## List of APIs

### Registration APIs

| EndPoint                | Authentication Required | Description                           |
| :---------------------- | :---------------------- | :------------------------------------ |
| `POST /api/user/signup` | false                   | Creates user in the database          |
| `POST /api/user/login`  | false                   | Responds with tokenID if a valid user |

### Pulbic APIs

| EndPoint                              | Authentication Required | Description                        |
| :------------------------------------ | :---------------------- | :--------------------------------- |
| `GET /api/movies/`                    | false                   | Fetches all movies in the database |
| `GET /api/movies?sortby=release_date` | false                   | Fetches all movies by release date |
| `GET /api/movies?sortby=upvotes`      | false                   | Fetches all movies by upvotes      |
| `GET /api/movies?sortby=downvotes`    | false                   | Fetches all movies by downvotes    |

### Restricted APIs

| EndPoint                            | Authentication Required | Description                             |
| :---------------------------------- | :---------------------- | :-------------------------------------- |
| `POST /api/movies/`                 | true                    | Create a new movie                      |
| `PUT api/movies/{movieID}/downvote` | true                    | Downvotes the movie                     |
| `PUT api/movies/{movieID}/upvote`   | true                    | Upvotes the movie                       |
| `PUT api/movies/{movieID}/review`   | true                    | Adds a review to the movie              |
| `PUT /api/user/setgenre`            | true                    | Set user's favorite genre               |
| `GET /api/movies/recommendations`   | true                    | Returns movies recommended for the user |
