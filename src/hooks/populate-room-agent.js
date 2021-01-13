// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { result, app } = context;

    const re = await app
      .service("add-requests")
      .patch(result.request, { approved: true });

    if (!re.email) {
      throw new Error("cannot find request");
    }

    const res = await app
      .service("users")
      .patch(result.tenant, { organization: result._id, agency: result.agent });

    if (!res._id) {
      throw new Error("An error occured");
    }
    //  console.log(ind)
    // Best practise, hooks should always return the context
    return context;
  };
};
