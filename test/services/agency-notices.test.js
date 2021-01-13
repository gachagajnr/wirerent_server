const assert = require('assert');
const app = require('../../src/app');

describe('\'agency-notices\' service', () => {
  it('registered the service', () => {
    const service = app.service('agency-notices');

    assert.ok(service, 'Registered the service');
  });
});
