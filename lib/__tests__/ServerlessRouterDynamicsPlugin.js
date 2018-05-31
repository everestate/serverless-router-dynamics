const ServerlessRouter = require('@everestate/serverless-router');
const ServerlessRouterDynamicsPlugin = require('../ServerlessRouterDynamicsPlugin');

const webhookRequestOnLeadCreate = require('./__fixtures__/webhookRequestOnLeadCreate');
const webhookRequestOnLeadUpdate = require('./__fixtures__/webhookRequestOnLeadUpdate');
const webhookRequestOnLeadDelete = require('./__fixtures__/webhookRequestOnLeadDelete');


const subj = (router = new ServerlessRouter([ServerlessRouterDynamicsPlugin])) => {
  router.dynamics
    .create('lead', () => ({ lead: 'create' }))
    .update('lead', () => ({ lead: 'update' }))
    .delete('lead', () => ({ lead: 'delete' }));
  return router;
};

describe('ServerlessRouterDynamicsPlugin', () => {
  describe('on Create request', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(webhookRequestOnLeadCreate)).toEqual({ lead: 'create' })));

  describe('on Update request', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(webhookRequestOnLeadUpdate)).toEqual({ lead: 'update' })));

  describe('on Delete request', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(webhookRequestOnLeadDelete)).toEqual({ lead: 'delete' })));

  test('pluginName', () =>
    expect(ServerlessRouterDynamicsPlugin.pluginName).toEqual('dynamics'));
});
