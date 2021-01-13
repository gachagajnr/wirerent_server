const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require("feathers-hooks-common");

const processRequest = require('../../hooks/process-request');

const addMovingOutStatus = require('../../hooks/add-moving-out-status');

const updateRoomMovingStatus = require('../../hooks/update-room-moving-status');

const teamsResolver = {
  joins: {
    teams: () => async (request, context) =>
      (request.teams = await context.app.service("teams").find({
        query: {
          agency: request.agency,
          //paginate: false
        },
      })),
  },
};
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processRequest()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      // fastJoin(teamsResolver)
      ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
