const Router = require('@everestate/serverless-router');
const Dynamics = require('../Dynamics');

const webhookRequestOnLeadCreate = require('./__fixtures__/webhookRequestOnLeadCreate');
const webhookRequestOnLeadUpdate = require('./__fixtures__/webhookRequestOnLeadUpdate');
const webhookRequestOnLeadDelete = require('./__fixtures__/webhookRequestOnLeadDelete');
const webhookRequestOnOpportunityAssign = require('./__fixtures__/webhookRequestOnOpportunityAssign');

const subj = (router = new Router([Dynamics])) => {
  router.dynamics
    .create('lead', (ctx, event) => ({ lead: 'create', ctx, event }))
    .update('lead', (ctx, event) => ({ lead: 'update', ctx, event }))
    .delete('lead', (ctx, event) => ({ lead: 'delete', ctx, event }))
    .assign('opportunity', (ctx, event) => ({ opportunity: 'assign', ctx, event }));
  return router;
};

describe('Dynamics', () => {
  describe('on Create request', () => {
    test('invokes matching callback', async () =>
      expect(await subj().dispatch(webhookRequestOnLeadCreate)).toEqual({
        lead: 'create',
        ctx: {
          id: 'e837c9ec-8151-e811-a950-000d3a391928',
          entity: {
            _createdby_value: '593db65c-9747-e811-a94f-000d3a395ecc',
            _modifiedby_value: '593db65c-9747-e811-a94f-000d3a395ecc',
            _ownerid_value: '593db65c-9747-e811-a94f-000d3a395ecc',
            _owningbusinessunit_value: 'b30c16dc-7546-e811-a955-000d3a28937c',
            _owninguser_value: '593db65c-9747-e811-a94f-000d3a395ecc',
            createdon: '2018-05-06T23:05:11.000Z',
            description: null,
            emailaddress1: 'test@example.com',
            firstname: 'Max',
            fullname: 'Max Mustermann',
            isprivate: false,
            lastname: 'Mustermann',
            leadid: 'e837c9ec-8151-e811-a950-000d3a391928',
            merged: false,
            modifiedon: '2018-05-06T23:05:11.000Z',
            modifiedonbehalfby: null,
            new_salutation: 100000000,
            statecode: 0,
            statuscode: 1,
            subject: 'Hello there!',
            yomifullname: 'Max Mustermann',
          },
        },
        event: webhookRequestOnLeadCreate,
      }));
  });

  describe('on Update request', () => {
    test('invokes matching callback', async () =>
      expect(await subj().dispatch(webhookRequestOnLeadUpdate)).toEqual({
        lead: 'update',
        ctx: {
          id: 'e837c9ec-8151-e811-a950-000d3a391928',
          entity: {
            _modifiedby_value: '593db65c-9747-e811-a94f-000d3a395ecc',
            _new_purchaseprofile_value: 'eb37c9ec-8151-e811-a950-000d3a391928',
            leadid: 'e837c9ec-8151-e811-a950-000d3a391928',
            modifiedon: '2018-05-06T23:05:11.000Z',
            modifiedonbehalfby: null,
          },
        },
        event: webhookRequestOnLeadUpdate,
      }));
  });

  describe('on Delete request', () => {
    test('invokes matching callback', async () =>
      expect(await subj().dispatch(webhookRequestOnLeadDelete)).toEqual({
        lead: 'delete',
        ctx: {
          id: 'b9581547-2a60-e811-a952-000d3a391928',
          entity: {},
        },
        event: webhookRequestOnLeadDelete,
      }));
  });

  describe('on Assign request', () => {
    test('invokes matching callback', async () => expect(await subj().dispatch(webhookRequestOnOpportunityAssign)).toEqual({
      opportunity: 'assign',
      ctx: {
        id: 'b77cca08-7450-e911-a95c-000d3a454977',
        entity: {},
      },
      event: webhookRequestOnOpportunityAssign,
    }));
  });

  test('pluginName', () =>
    expect(Dynamics.pluginName).toEqual('dynamics'));
});
