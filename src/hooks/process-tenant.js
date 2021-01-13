// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require("../services/authmanagement/notifier");
const processUpdateRoomWTenant = require("../hooks/update-room-w-tenant");

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { data, app, params } = context;
    //console.log(data.phone)
    const user = params.user;

    const available = await app.service("users").find({
      query: {
        isVerified: true,
        organization: null,
        email: data.email,
       // phone: data.phone,
        $limit: 1,
      },
    });
// console.log(available.data[0]._id);
    if (available.total !== 1) {
      throw new Error("No record found, try again");
    }

    const res = await app.service("rooms").get(data.room);
// console.log(res);

    if (!res) {
      throw new Error("No record found, try again");
    }
    context.data = {
      agency: res.agent,
      building: res.building,
      room: data.room,
      user: available.data[0]._id,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      paidVia: data.paidVia,
      idnumber: data.idnumber,
      author: user._id,
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
