# README

## Cats Frontend

The Cats application frontend.

## Setup

### Install Node

I've used Node v14.15.0, which can be installed via `nvm`. [https://nvm.sh](https://nvm.sh)

```bash
# install node version
nvm install v14.15.0
# to select the node version
nvm use
```

### Install Yarn

Install yarn by using `npm`.

```bash
npm install --global yarn
```

### Install dependencies

Installing dependencies.

```bash
yarn check --check-files || yarn install
```

### Environment variables

Setting the environment variables at the `.env` file.

```bash
# Base URL for the Cats API
REACT_APP_BASE_URL_CATS_API=http://localhost:3010/api/v1
```

### Run test

You can run the tests, including the coverage report by running on a terminal:

```bash
yarn test --coverage --watchAll=false
```

### Start the application

You can start the frontend application by running on a terminal:

```bash
yarn start
```

Note: Be sure to start the backend server before starting the frontend.
