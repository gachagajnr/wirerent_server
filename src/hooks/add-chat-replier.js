// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    console.log(result);


    await app
      .service("users")
      .patch(result.repliedBy, { rooms: result._id });
    return context;
  };
};
