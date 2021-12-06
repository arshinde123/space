# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

*Note: You may use "npm" instead of "yarn"*
## Install dependencies

### `yarn install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Folder structure
- Space
  - node_modules
  - public
  - src
    - components
      - common
    - pages
    - store
    - utils

### UI Library:

src > components > common folder contains all common (dumb components) they are state-less, they are driven by their parent components.

Here we have used react [Material UI](https://mui.com/) (MUI) library for styling.

Every common compoent (e.g button, loader, alert, etc) is created under src > components > common folder, the reason behind is that we don't want to have any reference (import) to MUI elsewhere other than src > components > common folder and this will benefit us in following way:

1. When we want to change look and feel of any of the common component, e.g we want to change look and feel of Button then there is only single point where we have to make changes i.e src > components > common > button

2. When we want to change our UI library from MUI to something else (e.g. bootstrap) in that case there is only change we have to do is under src > components > common. This will help to upgrade/replace UI library or look and feel of our design system very easily.


### HTTP Client:

Here we have used [axios](https://axios-http.com/) to make http requests and have written one middleware for this.

Note that, there is only one reference(import) to axios i.e. inside src > store > middleware > api.js, hence if in future we want to change our http client (axios) to something else there is only single file that we need to do changes i.e middleware/api.js.
