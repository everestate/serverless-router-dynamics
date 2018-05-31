const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const LazyContext = require('./LazyContext');


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

  static match(requestNameToMatch, entityNameToMatch, callback) {
    return (event) => {
      const {
        'x-ms-dynamics-request-name': requestName,
        'x-ms-dynamics-entity-name': entityName,
      } = event.headers;

      if (requestName !== requestNameToMatch || entityName !== entityNameToMatch) {
        return null;
      }
      return { callback, context: new LazyContext(event.body) };
    };
  }

  static get pluginName() { return 'dynamics'; }
}

module.exports = ServerlessRouterDynamicsPlugin;
