const { authenticate } = require('@feathersjs/authentication').hooks;

const processBuildingMassSms = require('../../hooks/process-building-mass-sms');

const sendBuildingMassSms = require('../../hooks/send-building-mass-sms');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processBuildingMassSms()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendBuildingMassSms()],
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
