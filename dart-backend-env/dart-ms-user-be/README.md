# MICRO-SERVICE user implementation

The micro-service handles user related operations.

## Technologies

* NodeJS: Version 18.x.x

* Redis: Version 7.0.5

* MongoDB: Version 6.0.1

## Instalation

1. git clone the project
2. npm install
3. npm start

## Use-cases

* User registration
  Handles a temporary user functionality storing the users in cache until verified or timed out. The time limit is set in the .env file.

* User verification
  Verifies a temporary user.

* User authorization
  Handles the authorization process, checking the existence of a user and creates a user object.

* User update
  Handles the update of a user object.

## Logs

Check the "logs" directory within the root directory.
