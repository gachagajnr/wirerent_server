// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, app, params } = context;
    const user = params.user;
    const rum = await app.service("rooms").get(data.room);

    context.data = {
      status: data.status,
      refno: data.bankrefno,
      amount: data.amount,
      depositedBy: data.depositedBy,
      paidOn: data.paidOn,
      room: data.room,
      roomName: rum.identity,
      buildingName:rum.building_name,
      building: rum.building,
      agency: rum.agent,
      depositedAt: data.depositedAt,
      author: user._id,
    };
    return context;
  };
};
