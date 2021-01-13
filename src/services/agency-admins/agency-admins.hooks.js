const { authenticate } = require("@feathersjs/authentication").hooks;
const processAgencyAdmin = require("../../hooks/process-agency-admin");


const inviteAgencyAdmin = require('../../hooks/invite-agency-admin');


const updateAdminStatus = require('../../hooks/update-admin-status');


module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processAgencyAdmin()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [inviteAgencyAdmin()],
    update: [],
    patch: [updateAdminStatus()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
