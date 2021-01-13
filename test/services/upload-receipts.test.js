const assert = require('assert');
const app = require('../../src/app');

describe('\'upload-receipts\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-receipts');

    assert.ok(service, 'Registered the service');
  });
});
