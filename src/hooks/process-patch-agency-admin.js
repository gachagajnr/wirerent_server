// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { app, result } = context;

    if (!result.isApproved) {
      throw new Error("Not approved");
    }
    console.log("PATCHING AGENCY", result);
    const res = await app.service("users").find({
      query: {
        email: result.email,
        isVerified: true,
        $limit: 1
      }
    });

    await app
      .service("agents")
      .patch(result.organization, { $push: { admins: result._id } });

    const id = res.data[0]._id;
    await app.service("users").patch(id, {
      organization: result.organization,
      role: result.right
    });

    // Best practise, hooks should always return the context
    return context;
  };
};
