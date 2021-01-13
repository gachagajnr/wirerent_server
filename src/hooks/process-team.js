// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data } = context;

    const user = context.params.user;
    const team = context.data;

    const agency = await app.service("agents").get(team.agent);

    context.data = {
      agency_name: agency.name,
      agency: agency._id,
      expertise: team.name,
      leader_phone: team.leader_phone,
      leader_email: team.leader_email,
      leader_name: team.leader_name,
      members: team.members,
    };

    return context;
  };
};
