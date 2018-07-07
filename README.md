# Nodepop
Práctica JS/Node.js/MongoDB Boot 7 (2018)

### MongoDB

This application uses MongoDB. To start MongoDB you can use:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
````
## Development

To start the application in development mode use:

```shell
npm run dev
````

## API Documentation

### Register

To register make a POST to: http://localhost:3000/apiv1/users/signup with name & email & password.

### Login (Authentication)

To obtain a token make a POST to: http://localhost:3000/apiv1/users/login with email & password.

Use that token in the rest of request in:
- header: 'x-access-token'
- body: token
- query string: token

### List Ads

To get ads list make a GEt to: http://localhost:3000/apiv1/ads

Filter by name:

?name=Smartphone

Filter by sale:

?sale=true

Filter by fields:

?fields=name or ?fields=20name%20price

Choose some fields:

?fields=name- _id

Paginate results:

?limit=1&skip=3&fields=name

### List Tags

To get tags list make a GEt to: http://localhost:3000/apiv1/tags

