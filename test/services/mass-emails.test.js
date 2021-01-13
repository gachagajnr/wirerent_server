const assert = require('assert');
const app = require('../../src/app');

describe('\'mass-emails\' service', () => {
  it('registered the service', () => {
    const service = app.service('mass-emails');

    assert.ok(service, 'Registered the service');
  });
});
