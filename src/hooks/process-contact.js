// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, params, app } = context;
    const user = params.user;

    const agent = await app.service("buildings").get(data.building);
    console.log(agent);
    context.data = {
      name: data.name,
      building: data.building,
      station: data.station,
      contacts: data.contacts,
      author: user._id,
      agency: agent.agent,
    };
    return context;
  };
};
