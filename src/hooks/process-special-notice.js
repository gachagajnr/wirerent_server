// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data, params } = context;
    const user = params.user;
    const res = await app.service("rooms").get(data.room);
    const phone = await app.service("users").get(res.tenant);
    context.data = {
      to: res.tenant,
      phone: phone.phone,
      room: data.room,
      author: user._id,
      date: data.date,
      topic: data.value,
      title: data.title,
      description: data.description,
    };
    return context;
  };
};
