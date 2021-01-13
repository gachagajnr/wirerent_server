const assert = require('assert');
const app = require('../../src/app');

describe('\'single-sms\' service', () => {
  it('registered the service', () => {
    const service = app.service('single-sms');

    assert.ok(service, 'Registered the service');
  });
});
