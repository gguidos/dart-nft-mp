# MICRO-FRONTEND orchestrator

The micro-service handles the orchestration of the different parts of the frontend.

## Technologies

* NodeJS: Version 18.x.x

## Instalation

1. git clone the project
2. npm install
3. npm start

## Adding a new layout

1. Make a copy of an existing layout in the src/layouts directory and point it to the desired micro-frontend component.
2. Add the route in the local import section of the index.ejs file (check the existing imports)
