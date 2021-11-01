# README

## Cats Backend

The Cats application backend.

## Setup

### Install Ruby

I've used Ruby 3.0.0, which can be installed via `rvm`. [https://rvm.io/](https://rvm.io/)

```bash
# install ruby version
rvm install "ruby-3.0.0"
# to use the ruby version and create the given gemset
rvm use
```

### Setup

Installing dependencies.

```bash
gem install bundler
bundle check || bundle install
```

### Environment variables

Use `.env` file to declare the varialbes. (see `env.sample`)

```
export BACKEND_DATABASE_PASSWORD=
export CATS_API_KEY=<key>
export CATS_API_URL=https://api.thecatapi.com/v1
```

Note: I'm sending the Cats API key separately.

### Database setup

You can setup the Cats Database by running on a terminal:

```bash
rails db:drop db:setup
```

### Run test

You can run the tests, including the coverage report by running on a terminal:

```bash
rspec
```

### Start the application

You can start the backend application by running on a terminal:

```bash
rails s
```
