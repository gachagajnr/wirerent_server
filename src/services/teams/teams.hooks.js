const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disableMultiItemChange,
  fastJoin,

} = require("feathers-hooks-common");
const processTeam = require('../../hooks/process-team');
const tasksResolvers = {
  joins: {
    tasks: () => async (team, context) =>
      (team.tasks = await context.app.service("requests").find({
        query: {
          team: team._id,
          // paginate: false,
          //  $limit: 1,
        },
      })),
  },
};
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processTeam()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(tasksResolvers)],
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
