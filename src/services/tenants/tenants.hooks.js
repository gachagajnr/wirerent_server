const { authenticate } = require('@feathersjs/authentication').hooks;
const accountService = require("../authmanagement/notifier");
const processTenant = require("../../hooks/process-tenant");
const processUpdateRoomWTenant = require("../../hooks/update-room-w-tenant");
const {  fastJoin } = require("feathers-hooks-common");

const addTenantToRoom = require('../../hooks/add-tenant-to-room');
const infoResolvers = {
  joins: {
    // smses: (...args) => async (tenant, context) =>
    //   (tenant.smses = await context.app.service("singlesms").find({
    //     query: {
    //       recepient: tenant.user,

    //       // $limit: 2,
    //     },
    //     // paginate: false,
    //   })),
  },
};
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [ ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(infoResolvers)],
    find: [],
    get: [],
    create: [ ],
    update: [],
    patch: [
      // (context) => {
      //   accountService(context.app).notifier(
      //     "inviteExistingtenant",
      //     context.result.email,
      //     context.result.room
      //   );
      // },
      // processUpdateRoomWTenant(),
    ],
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
