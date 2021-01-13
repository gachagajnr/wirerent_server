const { authenticate } = require('@feathersjs/authentication').hooks;

const processSpecialNotice = require('../../hooks/process-special-notice');

const sendSpecialNotice = require('../../hooks/send-special-notice');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processSpecialNotice()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendSpecialNotice()],
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
