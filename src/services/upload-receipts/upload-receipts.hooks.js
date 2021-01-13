const { authenticate } = require('@feathersjs/authentication').hooks;
const dauria = require("dauria");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
     async function (context) {
        // console.log("AAAAAAAAAAAAAAAAAA");
        if (!context.data.uri && context.params.file) {
          const file = context.data.uri;
          const uri =await dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { uri: uri };
        }
      }
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
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
