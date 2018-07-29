# Nodepop
Práctica JS/Node.js/MongoDB Boot 7 (2018)

### MongoDB

This application uses MongoDB. To start MongoDB you can use:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
````
## Production

To start the application in production mode use:

```shell
npm run start
````

## Cluster

To start the application with cluster mode use:

```shell
npm run cluster
````

## Development

To start the application in development mode use:

```shell
npm run dev
````

## DB Install

To install the DB with sample data use:

```shell
npm run install_db
````

## API Documentation

### Register

To register make a POST to: http://localhost:3000/apiv1/users/register with name & email & password.

### Login (Authentication)

To obtain a token make a POST to: http://localhost:3000/apiv1/users/login with email & password.

Use that token in the rest of request in:
- header: 'x-access-token'
- body: token
- query string: token

Test accounts:
- Email: neo@matrix.com | Password: 6MRdj?=L<kAQY;u_Bb8*H]mS{x{ktp5g
- Email: trinity@matrix.com | Password: 2(EuUn7U?D<2?&j+_m&@Za3P<=Rb)SZ5
- Email: morfeo@matrix.com | Password: ];u2923E^kK)Srz.p242X6Xx5fpL9+aR

### List Ads

To get ads list make a GET to: http://localhost:3000/apiv1/ads

Filter by tags:

?tags=mobile

Filter by sale:

?sale=true

Filter by price:

- price between 10-50 (included)

?price=10-50

- price greater than 10

?price=10-

- price lower than 50

?price=-50

- price equal to 50

?price=50

Filter by name:

?name=nok

Filter by fields:

?fields=name or ?fields=20name%20price

Choose some fields:

?fields=name- _id

Paginate results:

?limit=1&skip=3&fields=name

### List Tags

To get tags list make a GEt to: http://localhost:3000/apiv1/tags

# DevOps
Práctica DevOps Boot 7 (2018)

## URL

http://ec2-54-86-24-166.compute-1.amazonaws.com/

## IP

http://54.86.24.166/

