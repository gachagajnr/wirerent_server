const { authenticate } = require('@feathersjs/authentication').hooks;

const processSingleEmail = require('../../hooks/process-single-email');

const sendSingleEmail = require('../../hooks/send-single-email');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processSingleEmail()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendSingleEmail()],
    update: [],
    patch: [],
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
