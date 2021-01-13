const { authenticate } = require('@feathersjs/authentication').hooks;
const processBuildingAdmin = require("../../hooks/process-building-admin");
const processUpdateBuildingAdmin = require("../../hooks/process-update-building-admin");
const processPatchBuildingAdmin = require("../../hooks/process-patch-building-admin");
const accountService = require("../authmanagement/notifier");
const updateAdminStatus = require("../../hooks/update-admin-status");

const inviteBuildingAdmin = require('../../hooks/invite-building-admin');

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processBuildingAdmin()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [inviteBuildingAdmin()],
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
