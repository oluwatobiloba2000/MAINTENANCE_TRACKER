[![Build Status](https://travis-ci.com/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL.svg?branch=writing-test)](https://travis-ci.com/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL)       [![Coverage Status](https://coveralls.io/repos/github/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL/badge.svg)](https://coveralls.io/github/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL)  [![Maintainability](https://api.codeclimate.com/v1/badges/51c2f1d36caa0b3b8f49/maintainability)](https://codeclimate.com/github/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL/maintainability)       [![Test Coverage](https://api.codeclimate.com/v1/badges/51c2f1d36caa0b3b8f49/test_coverage)](https://codeclimate.com/github/oluwatobiloba2000/MAINTENANCE_TRACKER_FINAL/test_coverage)

# Tracky

Tracky is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

## Feature ##
* There are two users, the Admin and the User.
* Users can sign up.
* Users can log in.
* Users can create requests.
* Admin can approve a requests.
* Admin can resolve a requests.
* Admin can disapprove a requests.

## Technology used to run the project locally ##
* Text editor
* Git Bash
* Any browser preferably Google Chrome
* Postman

## Link to Github pages ##
    https://oluwatobiloba2000.github.io/MAINTENANCE_TRACKER/

## Link to Trello Board ##
* User interface board
https://trello.com/b/NEQopvgJ/maintenance-tracker-app-setting-up-the-user-interface-element

* Api endpoints board
https://trello.com/b/MvkC0Xxd/maintenance-tracker-app-set-up-and-test-api-endpoints

* Api with database board
https://trello.com/b/tnnLC6JE/maintenance-tracker-app-challenge-3-create-more-api-endpoints-and-integrate-a-database

## How to clone the project ##
* git clone https://github.com/oluwatobiloba2000/MAINTENANCE_TRACKER.git

## How to start the server ##
* `npm run start` to start the server

## Api Endpoints ##
* POST `/auth/signup`
* POST `/auth/login`
* GET `/api/v1/users/requests`
* GET `/api/v1/requests`
* GET `/api/v1/users/requests/:id`
* POST `/api/v1/users/requests`
* PUT `/api/v1/users/requests/:id`
* PUT `/api/v1/requests/:id/approve`
* PUT `/api/v1/requests/:id/resolve`
* PUT `/api/v1/requests/:id/disapprove`

## Author ##
Anani oluwatobiloba