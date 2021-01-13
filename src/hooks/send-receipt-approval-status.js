// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    // console.log(result)
    const user = await app.service("users").get(result.author);
    // console.log(user)
    let singlesms;

    if (result.hasRequestedReceipt === true) {
      singlesms = {
        to: user.phone,
        text:
          "Your Transaction Did not match with our servers, kindly upload the deposit slip",
      };
    } else {
      singlesms = {
        to: user.phone,
        text: "Your Transaction has been verified Sucessfully",
      };
    }

    await accountService(app).notifier(
      "sendSingleSms",
      "",
      "",
      "",
      "",
      "",
      singlesms
    );
    return context;
  };
};
