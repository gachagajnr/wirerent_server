// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result } = context;
    // console.log(result);
    if (result.action === "move") {
    } else if (result.action === "cancel") {
    } else if (result.action === "vacate") {
      // console.log("after VACATE", result);
      const res = await app
        .service("users")
        .find({ query: { organization: result._id } });
      // console.log(res);
      const user = await app.service("users").patch(res.data[0]._id, {
        agency: null,
        organization: null,
        building: null,
      });
      // console.log(user);
    } else {
      await app
        .service("add-requests")
        .patch(result.request, { approved: true });
      await app.service("users").patch(result.tenant, {
        organization: result._id,
        building: result.building,
        agency: result.agent,
      });
    }

    return context;
  };
};
