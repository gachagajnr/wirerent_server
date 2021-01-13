const { authenticate } = require("@feathersjs/authentication").hooks;
const accountService = require("../authmanagement/notifier");
const { disallow } = require("feathers-hooks-common");
const {
  iff,
  preventChanges,
  isProvider,
  discard,
} = require("feathers-hooks-common");
const verifyHooks = require("feathers-authentication-management").hooks;
const {
  hashPassword,
  protect,
} = require("@feathersjs/authentication-local").hooks;


const createUserOrganization = require('../../hooks/create-user-organization');


module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [
      hashPassword("password"),
      verifyHooks.addVerification(),
     // verifyHooks.isVerified(),
    ],
    update: [
      iff(
        isProvider("external"),
        preventChanges(
          "isVerified",
          "verifyToken",
          "verifyShortToken",
          "verifyExpires",
          "verifyChanges",
          "resetToken",
          "resetShortToken",
          "resetExpires"
        )
      ),
    ],
    patch: [
      iff(
        isProvider("external"),
        hashPassword("password"),
        preventChanges(
          "email",
          "isVerified",
          "verifyToken",
          "verifyShortToken",
          "verifyExpires",
          "verifyChanges",
          "resetToken",
          "resetShortToken",
          "resetExpires"
        )
      ),
    ],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [
      protect("password"),
      (context) => {
        accountService(context.app).notifier(
          "resendVerifySignup",
          context.result
        );
      },
      verifyHooks.removeVerification(),
      createUserOrganization(),
    ],
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
