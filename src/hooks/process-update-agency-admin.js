// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { app, data } = context;
    // console.log(data)
    // await app.service("rooms").patch(result._id, { agent: building.agent });
    const user = await app.service("users").find({
      query: {
        email: data.email,
        isVerified: true,
        $limit: 1,
      },
    });
    console.log("111111111", user);
    if (user.total !== 1) {
      throw new Error("User is not successfully registered");
    }
    context.data = {
      isApproved: true,
    };
    // Best practise, hooks should always return the context
    return context;
  };
};
