[![Stories in Ready](https://badge.waffle.io/amused-rutabega/thesecrettoiletsofsf.png?label=TO%20DO&title=Ready)](https://waffle.io/amused-rutabega/thesecrettoiletsofsf)
[![Travis CI](https://travis-ci.org/amused-rutabega/thesecrettoiletsofsf.svg)](https://travis-ci.org/amused-rutabega/thesecrettoiletsofsf)
# thesecrettoiletsofsf

> An app that finds you all the closest free public toilets.

## Team

  - __Product Owner__: Brandon B
  - __Scrum Master__: Andrew N
  - __Development Team Members__: Brandon B, Andrew N, Brian L

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 4.x
- Redis 2.6.x
- Postgresql 9.1.x

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
### Running the app on local server
To run the app on your local server:

1. Derive an API key from [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)
2. Setup a postgres database on your local machine

###### Setting up the API
Assuming you have an API key in hand, go to `config.js` under the `client` directory and replace `YOUR_API_KEY_HERE` with your key.

###### Setting up postgresql database
Run 
```sh
$ brew install postgresql
```
Then, to start the postgre server, run
```sh
$ pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```
Then, create the a database by running
```sh
createdb gottago
```
After you have created a new database, you need to make a `.bash_profile` in the root directory and declare the following variables.
```sh
# .bash_profile
export DATABASE='<database you created>'
export DATABASE_USERNAME='<username you created the database with>'
export DATABASE_SERVER='localhost'
export DATABASE_PASSWORD='<your password if you created one>'
```
After saving the `.bash_profile`, you can try to start the server by running
```sh
$ source .bash_profile
$ npm start
```
Make sure to run `source .bash_profile` first, otherwise none of the environment variables will exist and the database connection will no established properly.
By default, you can access the app at `http://localhost:8080`. 

When finished, stop the postgres server by running
```sh
pg_ctl -D /usr/local/var/postgres stop -s -m fast
```

### Roadmap

View the project roadmap at [waffle.io](https://waffle.io/amused-rutabega/thesecrettoiletsofsf)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
