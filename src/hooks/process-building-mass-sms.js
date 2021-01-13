// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data, params } = context;
    const user = params.user;

    const agent = await context.app.service("buildings").get(data.building);
    context.data = {
      title: data.title,
      message: data.message,
      building: data.building,
      organization: agent.agent,
      author: user._id,
    };
    return context;
  };
};
