const { authenticate } = require('@feathersjs/authentication').hooks;

const processMassMail = require('../../hooks/process-mass-mail');

const sendAgencyMassEmails = require('../../hooks/send-agency-mass-emails');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMassMail()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendAgencyMassEmails()],
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
