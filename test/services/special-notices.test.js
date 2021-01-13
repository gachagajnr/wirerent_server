const assert = require('assert');
const app = require('../../src/app');

describe('\'special-notices\' service', () => {
  it('registered the service', () => {
    const service = app.service('special-notices');

    assert.ok(service, 'Registered the service');
  });
});
