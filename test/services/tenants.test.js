const assert = require('assert');
const app = require('../../src/app');

describe('\'tenants\' service', () => {
  it('registered the service', () => {
    const service = app.service('tenants');

    assert.ok(service, 'Registered the service');
  });
});
