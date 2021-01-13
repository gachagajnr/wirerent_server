// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { data, app } = context;

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const room = context.data;
    // console.log(room.request)
    const req = await app.service("add-requests").get(room.request);
    // console.log( req );

    if (!req._id) {
      throw new Error("Cannot find request");
    }
    const building_data = await app.service("buildings").get(room.building);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      identity: room.identity,
      floor: room.floor,
      rent: room.rent,
      features: room.features,
      isOccupied: true,
      isVacant: false,
      bills: room.bills,
      request: room.request,
      type: room.type,
      building: room.building,
      since: new Date(),
      quote: room.quote,
      meterno: room.meterno,
      notes: room.notes,
      signed: room.signed,
      idnumber: room.idnumber,
      agent: room.agent,
      tenant: req.user,
      payment: building_data.payment,
      // Set the user id
      building_name: building_data.name,
      author: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
