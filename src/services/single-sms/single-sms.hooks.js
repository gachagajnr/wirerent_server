const { authenticate } = require('@feathersjs/authentication').hooks;

const processSingleSms = require('../../hooks/process-single-sms');

const sendSingleSms = require('../../hooks/send-single-sms');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processSingleSms()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendSingleSms()],
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
