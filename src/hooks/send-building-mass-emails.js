// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;

    const res = await app.service("users").find({
      query: {
        //read: false,
        $select: "email",
        building: result.building,
        agency: result.organization,
      },
    });
    accountService(app).notifier("sendMassEmails", "","","", res, result);


    return context;
  };
};