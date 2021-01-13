// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, params } = context;

    const user = params.user;

    context.data = {
      date: data.date,
      rules: data.rules,
      author: user._id,
      agent: data.agent,
    };
    return context;
  };
};
