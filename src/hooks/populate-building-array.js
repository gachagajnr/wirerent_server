// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { app, result } = context;

    await app
      .service("agents")
      .patch(result.agent._id, { $push: { buildings: result._id } });

    // Best practise, hooks should always return the context
    return context;
  };
};
