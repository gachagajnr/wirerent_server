const { authenticate } = require('@feathersjs/authentication').hooks;

const processReceiptInfo = require('../../hooks/process-receipt-info');


const sendReceiptApprovalStatus = require('../../hooks/send-receipt-approval-status');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processReceiptInfo()],
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
    patch: [sendReceiptApprovalStatus()],
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
