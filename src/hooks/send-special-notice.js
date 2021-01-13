// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result } = context;

    await accountService(app).notifier(
      "sendCustomSms",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      result
    );
    return context;
  };
};
