// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { app, result } = context;

    const admin = await app.service("users").create({
      email: result.email,
      password: result.admins_phone,
      role: "agency_admin",
      phone: result.admins_phone,
      organization: result._id,
      resetPassword: true,
      isRoot: true,
    });

    // if (admin.email) {
    //   accountService(context.app).notifier("adminInvite", context.result);
    // }

    // Best practise, hooks should always return the context
    return context;
  };
};
