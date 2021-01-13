const { authenticate } = require('@feathersjs/authentication').hooks;
const processChat = require("../../hooks/process-chat");
const addBuildingToMessage=require('../../hooks/AddBuildingToMessage')
const {  fastJoin } = require("feathers-hooks-common");

const chatResolvers = {
  joins: {
    author: (...args) => async (chat, context) =>
      (chat.to = (
        await context.app.service("users").find({
          query: { _id: chat.to },
          paginate: false
        })
      )[0])
  }
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processChat()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(chatResolvers)],
    find: [],
    get: [],
    create: [],
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
