const assert = require('assert');
const app = require('../../src/app');

describe('\'addRequests\' service', () => {
  it('registered the service', () => {
    const service = app.service('add-requests');

    assert.ok(service, 'Registered the service');
  });
});
