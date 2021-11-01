# fullstack-project

Rails/React coding project for full-stack developer candidates

## Requirements:

- Build application using React on the frontend and Rails on the backend
- Integrate with image API of your choosing (e.g. giphy, dog API, TheCatAPI, etc.)
- Build search interface to return images related to search term via API
- For images that are returned, allow users to 'favorite' images
- Allow users to view images they have favorited
- Spend no more than 4 hours coding for the project. Do not include any initial application setup in this time limit.

### Add-ons:

- Sign up/log in functionality
- Filter or search favorites

### Things we're looking for:

- Good state management
- Logical database persistence
- Keyboard accessibility
- Unit tests for front and backend

### Things we like:

- Well commented & well organized code
- Quality over quantity (the code you write should be good)
- Small, meaningful, commits
- Cute animals

## Submission:

- **Fork** this repository to your own git
- Create a new branch to push your commits as you work
- When complete, create a PR to the master branch (of your personal repo) so we can see the code that you added!
- Somehow share your repository with us
- **Important:** If there are credentials required (.env or master.key file), please email these to us directly or we can’t review your project

## Setup:

#### Backend

1. `$ cd backend`
2. `$ bundle install && yarn install`
3. Ensure postgres is running
   - `$ brew services start postgresql`
4. Create the db
   - `$ rake db:create`
5. Start the server
   - `$ rails s`
6. Your backend will be running on port 3010 by default

For more details look at the [Backend README](https://github.com/omarps/fullstack-project/blob/sandbox/backend/README.md).

#### Frontend

1. `$ cd frontend`
2. `$ yarn install`
3. Start the app
   - `$ yarn start`
4. Your frontend will be running on port 3000 by default

For more details look at the [Frontend README](https://github.com/omarps/fullstack-project/blob/sandbox/frontend/README.md).

#### Proxys and routing:

- Any fetch requests made from the frontend to `/api` will be routed to the backend server
- Ensure all routes are included in the `:api` namespace on the backend
