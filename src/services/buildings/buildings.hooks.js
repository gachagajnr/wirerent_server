const { authenticate } = require("@feathersjs/authentication").hooks;
const processBuilding = require("../../hooks/process-building");
const populateBuildingsArray = require("../../hooks/populate-building-array");
const { fastJoin } = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");

const buildingsResolver = {
  joins: {
    admins: () => async (building, context) =>
      (building.admins = await context.app.service("building-admins").find({
        query: {
          organization: building._id,
          //paginate: false
        },
      })),
    notices: () => async (building, context) =>
      (building.notices = await context.app.service("notices").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    requests: () => async (building, context) =>
      (building.requests = await context.app.service("requests").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    teams: () => async (building, context) =>
      (building.teams = await context.app.service("teams").find({
        query: {
          agency: building.agent,
          //paginate: false
        },
      })),
    chats: () => async (building, context) =>
      (building.chats = await context.app.service("chats").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    rooms: () => async (building, context) =>
      (building.rooms = await context.app.service("rooms").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    vacants: () => async (building, context) =>
      (building.vacants = await context.app.service("rooms").find({
        query: {
          building: building._id,
          isOccupied: {
            $ne: true,
          },
          //paginate: false
        },
      })),
    contacts: () => async (building, context) =>
      (building.contacts = await context.app.service("contacts").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    tenants: () => async (building, context) =>
      (building.tenants = await context.app.service("rooms").find({
        query: {
          building: building._id,
          moveoutRequested: true,

          //paginate: false
        },
      })),
    rooms: () => async (building, context) =>
      (building.rooms = await context.app.service("rooms").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    sms: () => async (building, context) =>
      (building.sms = await context.app.service("building-mass-sms").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),
    emails: () => async (building, context) =>
      (building.emails = await context.app
        .service("building-mass-emails")
        .find({
          query: {
            building: building._id,
            //paginate: false
          },
        })),
    receipts: () => async (building, context) =>
      (building.receipts = await context.app.service("receipts").find({
        query: {
          building: building._id,
          //paginate: false
        },
      })),

    // author: (...args) => async (building, context) =>
    //   (building.author = (
    //     await context.app.service("users").find({
    //       query: { _id: building.author },
    //       paginate: false,
    //     })
    //   )[0]),
  },
};
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
    create: [processBuilding()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(buildingsResolver)],
    find: [],
    get: [],
    create: [populateBuildingsArray()],
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
