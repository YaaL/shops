# Example REST API with Express.js & Mongoose

## Setup

Clone repository, start local MongoDB, then:

	npm install
	npm start

By default runs on http://localhost:8080.
Available endpoints:

* GET /shops - get all shops
* POST /shops - create a new shop
* GET /shops/:shopId - get shop by id
* PUT /shops/:shopId - update shop by id
* DELETE /shops/:shopId - delete shop by id

## Test

Tests are in `/test`, use Mocha + expect.js. Run:

	npm test
