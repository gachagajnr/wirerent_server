const { authenticate } = require('@feathersjs/authentication').hooks;

const processBuildingMassEmails = require('../../hooks/process-building-mass-emails');

const sendBuildingMassEmails = require('../../hooks/send-building-mass-emails');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processBuildingMassEmails()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendBuildingMassEmails()],
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
