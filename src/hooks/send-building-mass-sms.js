// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;

    // console.log(result);
    //if (result) {
    const res = await app.service("users").find({
      query: {
        //read: false,
        $select: "phone",
        building: result.building,
        agency: result.organization,
      },
    });
    // console.log(res);
    accountService(app).notifier("sendMassSMS", "", res, result);
    //}

    return context;
  };
};
