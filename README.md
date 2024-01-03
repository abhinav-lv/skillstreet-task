# SkillStreet Backend Task

## Get started

You will need to have Node, NPM and MongoDb installed on your system in order to run this app locally. MongoDB should be running in the default port:

`mongodb://127.0.0.1:27017/`

To start the app in development mode (hot reload), run:

`npm run dev`

To start the app in production mode, run:

`npm start`

If you have Docker installed on your system, this process is a lot easier. All you need to run is:

`docker-compose up --build`

> Keep in mind that the mongodb container won't have any data during startup, so there won't be any notes when you start the container. You will need to create notes using the POST endpoint before trying the other endpoints.

---

## API endpoints

- **Create a note:**

  ```
  POST http://localhost:8080/note/create
  ```

  The body should be in JSON format and have the title and content fields as strings.

  ```json
  {
    "title": "title1",
    "content": "asdfasdf"
  }
  ```

  If the note was created successfully, you'll receive a success message:

  ```json
  {
    "statusCode": 200,
    "message": "Note created successfully"
  }
  ```

  You can play around by giving integers or missing properties to see if the API handles the anomalies correctly.

- **Update a note:**

  ```
  PUT http://localhost:8080/note/update
  ```

  The body should be in JSON format and have the id of the note to be updated, title and content fields as strings (title and content are optional, but if given should be of string type)

  ```json
  {
    "id": "asdfasdfa", // should be actual id of a note
    "title": "title1"
  }
  ```

  If the note was updated successfully, you'll receive a success message:

  ```json
  {
    "statusCode": 200,
    "message": "Note updated successfully"
  }
  ```

  - **Get a note or all notes:**

  ```
  GET http://localhost:8080/note/get?id=asdfasdf
  ```

  If the id is passed as a query param, the API will return the details of that note, if found in the database. Otherwise it will return an array of the details of all the notes.

  Single note:

  ```json
  {
    "id": "6595a309e751f09070e43b12",
    "createdAt": "2024-01-03T18:10:17.933Z",
    "updatedAt": "2024-01-03T18:10:17.933Z",
    "title": "title2",
    "content": "adfasdfdafadfasdfadsff"
  }
  ```

- **Delete a note:**

  ```
  DELETE http://localhost:8080/note/delete/:id
  ```

  Here the id of the note is passed as a param in the endpoint. On success, we will get the response:

  ```json
  {
    "statusCode": 200,
    "message": "Note deleted successfully"
  }
  ```

---

## Validation

We are using class validator for validating incoming data. We pass this as a middleware where we take data from the request.

## Error handling

Error handling has been done at endpoint level, according to the logic required by that route handler.
