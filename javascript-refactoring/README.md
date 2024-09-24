## Get started

- Navigate to the root of javascript-refactoring and run:

  `yarn install`

- Run the project:

  `yarn start`

- Build the project:

  `yarn build`

  This transpiles the ts code into js in a `/dist` folder

- Run unit tests:

  `yarn test`

- Run test with coverage report:

  `yarn test-coverage`

  Test reports will be stored in `/coverage` folder

## Notes for Refactoring

1. Initalize new node project and add typescript. Used es modules instead of commonjs
2. Structured .json files to ts-objects with types
3. Added correct types to statement and refactored as arrow function
4. Moved formatter outside the function and divided result directly by 100
5. Used forEach loop and refactored calculations to a new function
6. Added JSDoc; changed variable names for better readability
7. Changed statement function name to generateInvoiceOrder
8. Changed extra credits from 5 to 10
9. All information needed for cost calculation of plays was restructured into an extra type
10. Refactored calculation function based on 9.
