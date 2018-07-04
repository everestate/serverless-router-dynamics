const createLazyContext = require('../createLazyContext');
const webhookRequestOnLeadCreate = require('./__fixtures__/webhookRequestOnLeadCreate');
const webhookRequestOnLeadUpdate = require('./__fixtures__/webhookRequestOnLeadUpdate');
const webhookRequestOnLeadDelete = require('./__fixtures__/webhookRequestOnLeadDelete');


const subj = payload => createLazyContext(payload);

describe('createLazyContext', () => {
  describe('on Create request', () =>
    test('extracts entity and id', () =>
      expect(subj(webhookRequestOnLeadCreate.body)).toMatchObject({
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
      })));

  describe('on Update request', () =>
    test('extracts entity', () =>
      expect(subj(webhookRequestOnLeadUpdate.body)).toMatchObject({
        id: 'e837c9ec-8151-e811-a950-000d3a391928',
        entity: {
          _modifiedby_value: '593db65c-9747-e811-a94f-000d3a395ecc',
          _new_purchaseprofile_value: 'eb37c9ec-8151-e811-a950-000d3a391928',
          leadid: 'e837c9ec-8151-e811-a950-000d3a391928',
          modifiedon: '2018-05-06T23:05:11.000Z',
          modifiedonbehalfby: null,
        },
      })));

  describe('on Delete request', () =>
    test('extracts entity', () =>
      expect(subj(webhookRequestOnLeadDelete.body)).toMatchObject({
        id: 'b9581547-2a60-e811-a952-000d3a391928',
        entity: {},
      })));
});
