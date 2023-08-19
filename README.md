# Purpose of the project

Here We did 3 types of pagination

1. Pagination Limit Based on Screen Size (done).
2. Infinite Scroll down.
3. Infinite Scroll up.
4. Tolerance Pagination.

## Install Yarn with brew.

```bash
brew install yarn
```

## Create React app Command.

```bash
yarn create react-app . --template typescript
```

## Packages Which Used.

```bash
yarn add --save redux @reduxjs/toolkit react-redux redux-saga @types/react-redux @types/redux-saga
yarn add redux-logger @types/redux-logger -D // for dev dependencies
yarn add --save axios @types/axios
yarn add react-infinite-scroller
```

## Notes

console.log(Math.ceil(1.6)); // always give greater value
console.log(Math.floor(1.9)); // always give lower value
console.log(Math.round(1.2)); // if above .5 give greater value else give lower value

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
