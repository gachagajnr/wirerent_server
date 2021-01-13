const { authenticate } = require('@feathersjs/authentication').hooks;

const processChatRoom = require('../../hooks/process-chat-room');

const addUserToChatroom = require('../../hooks/add-user-to-chatroom');
const { fastJoin } = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");

const chatsResolvers = {
  joins: {
    chats: () => async (chatroom, context) =>
      (chatroom.chats = await context.app.service("chats").find({
        query: {
          chatroom: chatroom._id,
          //paginate: false
          $sort: {
            createdAt: +1,
          },
        },
      })),
  },
};
const addChatReplier = require('../../hooks/add-chat-replier');
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processChatRoom()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(chatsResolvers)],
    find: [],
    get: [],
    create: [addUserToChatroom()],
    update: [],
    patch: [addChatReplier()],
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
