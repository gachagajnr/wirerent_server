const { authenticate } = require("@feathersjs/authentication").hooks;
const processAgent = require("../../hooks/process-agent");
const {
  disableMultiItemChange,
  fastJoin,
  iff,
} = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");

const checkPermissions = require("feathers-permissions");

const agentResolvers = {
  joins: {
    author: (...args) => async (agent, context) =>
      (agent.author = (
        await context.app.service("users").find({
          query: { _id: agent.author },
          paginate: false,
        })
      )[0]),

    buildings: () => async (agent, context) =>
      (agent.buildings = await context.app.service("buildings").find({
        query: {
          agent: agent._id,
          //paginate: false
        },
      })),

    rooms: () => async (agent, context) =>
      (agent.rooms = await context.app.service("rooms").find({
        query: {
          agent: agent._id,
          //paginate: false
        },
      })),
    requests: () => async (agent, context) =>
      (agent.requests = await context.app.service("requests").find({
        query: {
          agency: agent._id,
          //paginate: false
        },
      })),
    admins: () => async (agent, context) =>
      (agent.admins = await context.app.service("agency-admins").find({
        query: {
          organization: agent._id,
          //paginate: false
        },
      })),
    teams: () => async (agent, context) =>
      (agent.teams = await context.app.service("teams").find({
        query: {
          agency: agent._id,
          //paginate: false
          $sort: {
            createdAt: -1,
          },
        },
      })),
    sms: () => async (agent, context) =>
      (agent.sms = await context.app.service("mass-sms").find({
        query: {
          organization: agent._id,
          // paginate: false,
          //$limit: 20,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    emails: () => async (agent, context) =>
      (agent.emails = await context.app.service("mass-emails").find({
        query: {
          organization: agent._id,
          // paginate: false,
          //  $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    notices: () => async (agent, context) =>
      (agent.notices = await context.app.service("agency-notices").find({
        query: {
          agent: agent._id,
          // paginate: false,
          //  $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    inventory: () => async (agent, context) =>
      (agent.inventory = await context.app.service("inventory").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    tenants: () => async (agent, context) =>
      (agent.tenants = await context.app.service("rooms").find({
        query: {
          agent: agent._id,
          isVacant: false,
          //  $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    moving: () => async (room, context) =>
      (room.moving = await context.app.service("rooms").find({
        query: {
          agent: room._id,
          moveoutRequested: true,
          $sort: {
            createdAt: -1,
          },
          //paginate: false
        },
      })),
    vacants: () => async (agent, context) =>
      (agent.vacants = await context.app.service("rooms").find({
        query: {
          isOccupied: {
            $ne: true,
          },
          agent: agent._id,
        },
      })),

    transactions: () => async (agent, context) =>
      (agent.transactions = await context.app.service("receipts").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    rtransactions: () => async (agent, context) =>
      (agent.rtransactions = await context.app.service("receipts").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          hasRequestedReceipt: true,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    vtransactions: () => async (agent, context) =>
      (agent.vtransactions = await context.app.service("receipts").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          isVerified: true,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    single_sms: () => async (agent, context) =>
      (agent.single_sms = await context.app.service("single-sms").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          // isVerified: true,
          $sort: {
            createdAt: -1,
          },
        },
      })),
    single_emails: () => async (agent, context) =>
      (agent.single_emails = await context.app.service("single-emails").find({
        query: {
          agency: agent._id,
          // paginate: false,
          //  $limit: 1,
          // isVerified: true,
          $sort: {
            createdAt: -1,
          },
        },
      })),
  },
};

const assignAuthorToAgency = require("../../hooks/assign-author-to-agency");

module.exports = {
  before: {
    all: [
      authenticate("jwt"),
      // setField({
      //   from: "params.user.organization",
      //   as: "params.query._id"
      // })
      // iff(
      //   context => !context.params.permitted,
      //   setField({
      //     from: "params.user._id",
      //     as: "params.query.userId"
      //   })
      // )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [disableMultiItemChange()],
    remove: [],
  },

  after: {
    all: [fastJoin(agentResolvers)],
    find: [],
    get: [],
    create: [assignAuthorToAgency()],
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
