const assert = require('assert');
const app = require('../../src/app');

describe('\'notices\' service', () => {
  it('registered the service', () => {
    const service = app.service('notices');

    assert.ok(service, 'Registered the service');
  });
});
