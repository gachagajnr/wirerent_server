const assert = require('assert');
const app = require('../../src/app');

describe('\'mass-sms\' service', () => {
  it('registered the service', () => {
    const service = app.service('mass-sms');

    assert.ok(service, 'Registered the service');
  });
});
