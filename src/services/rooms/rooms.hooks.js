const { authenticate } = require("@feathersjs/authentication").hooks;

const processRoom = require("../../hooks/process-room");
const populateRoomsArray = require("../../hooks/populate-rooms-array");
const populateRoomAgent = require("../../hooks/populate-room-agent");
// const processPatchTenant = require("../../hooks/process-patch-tenant");
// const processUpdateTenantInfo = require("../../hooks/process-update-tenant");
const { disableMultiItemChange, fastJoin } = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");
const accountService = require("../authmanagement/notifier");
const processUpdateRoomWTenant = require("../../hooks/update-room-w-tenant");

const tenantResolvers = {
  joins: {
    notices: (...args) => async (room, context) =>
      (room.notices = await context.app.service("notices").find({
        query: {
          building: room.building,
          $sort: {
            createdAt: -1,
          },
          $limit: 2,
        },
        // paginate: false,
      })),
    requests: () => async (room, context) =>
      (room.requests = await context.app.service("requests").find({
        query: {
          room: room._id,
          //paginate: false
          $sort: {
            createdAt: -1,
          },
        },
      })),
    contacts: () => async (room, context) =>
      (room.contacts = await context.app.service("contacts").find({
        query: {
          agency: room.agent,
          //paginate: false
        },
      })),
    alerts: () => async (room, context) =>
      (room.alerts = await context.app.service("special-notices").find({
        query: {
          to: room.tenant,
          $sort: {
            createdAt: -1,
          },
          //paginate: false
        },
      })),
    chatrooms: () => async (room, context) =>
      (room.chatrooms = await context.app.service("chat-rooms").find({
        query: {
          roomId: room._id,
          $sort: {
            createdAt: -1,
          },
          //paginate: false
        },
      })),

    // payment: (...args) => async (room, context) =>
    //   (room.payment = (
    //     await context.app.service("payment-info").find({
    //       query: { building: room.building },
    //       paginate: false,
    //     })
    //   )[0]),
    receipts: () => async (room, context) =>
      (room.receipts = await context.app.service("receipts").find({
        query: {
          room: room._id,
          $sort: {
            createdAt: -1,
          },
          //paginate: false
        },
      })),

    user: (...args) => async (room, context) =>
      (room.user = (
        await context.app.service("users").find({
          query: {
            organization: room._id,
            $select: [
              "_id",
              "agency",
              "firstName",
              "surname",
              "email",
              "phone",
            ],
          },
          paginate: false,
        })
      )[0]),
  },
};
const assignTenantToRoom = require("../../hooks/assign-tenant-to-room");
const processRoomPatch = require("../../hooks/process-room-patch");
module.exports = {
  before: {
    all: [
      authenticate("jwt"),
      // setField({
      //   from: "params.user.organization",
      //   as: "params.query.agent"
      // })
    ],
    find: [],
    get: [],
    create: [processRoom()],
    update: [],
    patch: [processRoomPatch()],
    remove: [],
  },

  after: {
    all: [fastJoin(tenantResolvers)],
    find: [],
    get: [],
    create: [populateRoomAgent()],
    update: [],
    patch: [assignTenantToRoom()],
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
