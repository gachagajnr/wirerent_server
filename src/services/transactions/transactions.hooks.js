
const { authenticate } = require('@feathersjs/authentication').hooks;
const uploadReceipt = require("../../hooks/upload-receipt");

const updateTransaction = require('../../hooks/update-transaction');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [uploadReceipt()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateTransaction()],
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
