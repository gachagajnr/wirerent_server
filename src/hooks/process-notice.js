// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, app, params } = context;

    const user = params.user;

    const notice = data;

    const ag = await app.service("buildings").get(notice.building);

    context.data = {
      date: data.date,
      building: data.building,
      rules: data.rules,
      author: user._id,
      agent: ag.agent,
    };
    return context;
  };
};
