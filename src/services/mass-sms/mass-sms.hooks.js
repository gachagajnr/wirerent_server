const { authenticate } = require('@feathersjs/authentication').hooks;

const processMassSms = require('../../hooks/process-mass-sms');

const sendAgencyMassSms = require('../../hooks/send-agency-mass-sms');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMassSms()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendAgencyMassSms()],
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
