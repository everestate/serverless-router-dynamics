const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const createLazyContext = require('./createLazyContext');


class ServerlessRouterDynamicsPlugin extends BasePlugin {
  create(entityName, callback) {
    return this.appendRoute('Create', entityName, callback);
  }

  update(entityName, callback) {
    return this.appendRoute('Update', entityName, callback);
  }

  delete(entityName, callback) {
    return this.appendRoute('Delete', entityName, callback);
  }

  static match(requestNameToMatch, entityNameToMatch) {
    return (event) => {
      const {
        'x-ms-dynamics-request-name': requestName,
        'x-ms-dynamics-entity-name': entityName,
      } = event.headers;

      return requestName === requestNameToMatch && entityName === entityNameToMatch;
    };
  }

  static ctx(event) {
    return createLazyContext(event.body);
  }

  static get pluginName() { return 'dynamics'; }
}

module.exports = ServerlessRouterDynamicsPlugin;
