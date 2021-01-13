const assert = require('assert');
const app = require('../../src/app');

describe('\'payment-info\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-info');

    assert.ok(service, 'Registered the service');
  });
});
