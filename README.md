# @everestate/serverless-router-dynamics

> [Serverless Router](https://github.com/everestate/serverless-router) plugin to handle Microsoft Dynamics Webhooks

## Installation

```
npm install @everestate/serverless-router @everestate/serverless-router-dynamics --save
```

## Usage

```javascript
const ServerlessRouter = require('@everestate/serverless-router');
const ServerlessRouterDynamicsPlugin = require('@everestate/serverless-router-dynamics');

const leadService = require('../services/userService');

function dispatch(event) {
  const router = new ServerlessRouter([ServerlessRouterDynamicsPlugin]);

  router.dynamics
    .create('lead', ({ id, entity }) => {
      console.log(`Lead "${id} is created"`);
      return leadService.create(id, entity); // returns promise
    })
    .update('lead', ({ id, entity }) => {
      console.log(`Lead "${id} is updated"`);
      return leadService.update(id, entity); // returns promise
    })
    .delete('lead', ({ id }) => {
      console.log(`Lead "${id} is deleted"`);
      return leadService.delete(id); // returns promise
    });

  router.mismatch(() => {
    const {
      'x-ms-dynamics-request-name': requestName,
      'x-ms-dynamics-entity-name': entityName,
    } = event.headers;
    return Promise.reject(new Error(`Unknown route: ${requestName} ${entityName}`));
  });

  return router.dispatch(event);
}

function myLambdaHandler(event, context, callback) {
  return dispatch(event)
    .then(result =>
      callback(null, { statusCode: result.code, body: JSON.stringify({ payload: result.payload }) }))
    .catch(error =>
      callback(null, { statusCode: '500', body: JSON.stringify({ message: error.message }) }));
}
```

By default `serveless-router` will throw `error` on route mismatch.
It's possible to define [custom behaviour on mismatch](https://github.com/everestate/serverless-router#when-route-is-mismatched).

## License

[MIT](./LICENSE)
