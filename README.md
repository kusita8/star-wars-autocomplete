# Star Wars Character Searcher

Api: [https://swapi.dev/](https://swapi.dev/)

## Available Scripts

### `yarn start`

### `yarn test`

### `yarn build`

### `yarn eject`

### `yarn gc`

A little script I created to generate components for React.

## Improvements

#### `Add eslint config file`

Eslint helps you keep your code readable and mantainable.

Also when working with mutiple developers on the same proyect, is important to have a set of rules.

#### `Add global error manager`

In my opinion, errors should be handled on the same place.

Most of the time, all you want to do is catch an error and display the message on the app, the
message probably coming from the api.

Also if you want to track the errors with an external tool, handling every one in the same place
makes your job easier.

#### `Add E2E tests`

#### `Add cache to requests`

I tend to use [React query](https://tanstack.com/query/v4/) for requests because it automatically
handles cache and requests stages (loading, error, etc).

#### `Add Sass or Styled Components`

Css does the job, but when your application becomes big, you want to use other css tools to speed up
the process, add more flexibility, make your code more reusable/readable.
