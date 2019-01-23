const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const createLazyContext = require('./createLazyContext');

class Dynamics extends BasePlugin {
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

      if (requestName !== requestNameToMatch || entityName !== entityNameToMatch) {
        return null;
      }

      return createLazyContext(event.body);
    };
  }
}

module.exports = Dynamics;
