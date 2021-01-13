// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, app, params } = context;
    // console.log(data)
    const user = params.user;
    const res = await app.service("users").get(data.comm.recepient);
    // console.log(res)
    context.data = {
      text: data.text,
      to: data.comm.to,
      recepient: data.comm.recepient,
      agency: data.comm.agent,
      building: res.building,
      hse: res.organization_name,
      name: res.firstName,
      surname: res.surname,
      author: user._id,
    };
    return context;
  };
};
