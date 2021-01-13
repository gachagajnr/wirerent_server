const assert = require('assert');
const app = require('../../src/app');

describe('\'building-mass-emails\' service', () => {
  it('registered the service', () => {
    const service = app.service('building-mass-emails');

    assert.ok(service, 'Registered the service');
  });
});
