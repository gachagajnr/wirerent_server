// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, app, params } = context;
    const user = params.user;
    const res = await app.service("users").get(data.comm.recepient);

    context.data = {
      text: data.text,
      to: data.comm.to,
      hse: res.organization_name,
      name: res.firstName,
      surname: res.surname,
      building: res.building,
      recepient: data.comm.recepient,
      agency: data.comm.agent,
      author: user._id,
    };
    return context;
  };
};
