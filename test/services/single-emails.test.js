const assert = require('assert');
const app = require('../../src/app');

describe('\'single-emails\' service', () => {
  it('registered the service', () => {
    const service = app.service('single-emails');

    assert.ok(service, 'Registered the service');
  });
});
