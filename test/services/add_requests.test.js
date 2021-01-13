const assert = require('assert');
const app = require('../../src/app');

describe('\'add_requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('add-requests');

    assert.ok(service, 'Registered the service');
  });
});
