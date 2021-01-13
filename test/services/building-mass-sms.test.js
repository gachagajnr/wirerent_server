const assert = require('assert');
const app = require('../../src/app');

describe('\'building-mass-sms\' service', () => {
  it('registered the service', () => {
    const service = app.service('building-mass-sms');

    assert.ok(service, 'Registered the service');
  });
});
