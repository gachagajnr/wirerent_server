// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, app, params } = context;
    const user = params.user;

    context.data = {
      agency: data.agent,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      author: user._id,
      serial:data.serial
    };
    return context;
  };
};
