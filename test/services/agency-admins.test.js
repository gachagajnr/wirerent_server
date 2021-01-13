const assert = require('assert');
const app = require('../../src/app');

describe('\'agency-admins\' service', () => {
  it('registered the service', () => {
    const service = app.service('agency-admins');

    assert.ok(service, 'Registered the service');
  });
});
