// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { app, result } = context;
console.log(result)
    const room = await app.service("rooms").get(result.room);

    await app
      .service("rooms")
      .patch(room._id, { tenant: result._id, isOccupied: true });

    // const user = await app
    //   .service("users")
    //   .find({ query: { email: result.email, $limit: 1, isVerified: true } });

    // if (user.total !== 1) {
    //   throw new Error("Cannot find user");
    // }

    // await app.service("tenants").patch(result._id, { isApproved: true });

    return context;
  };
};
