const { authenticate } = require('@feathersjs/authentication').hooks;

const processAddRequest = require('../../hooks/process-add-request');

const createUserFromRequest = require('../../hooks/create-user-from-request');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processAddRequest()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [createUserFromRequest()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
