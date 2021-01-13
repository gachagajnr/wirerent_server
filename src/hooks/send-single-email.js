// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    const singleemail = result;
    await accountService(app).notifier(
      "sendSingleEmail",
      "",
      "",
      "",
      "",
      "",
      "",
      singleemail
    );

    return context;
  };
};
