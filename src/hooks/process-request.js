// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { data, app } = context;

    // Throw an error if we didn't get a text
    if (!data) {
      throw new Error("A message must have a text");
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const req = context.data;

    const building = await app.service("rooms").get(req.room);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      requested: req.value,
      description: req.description,
      date: req.date,
      room: req.room,
      action: req.action,
      building: building.building,
      identity: building.identity,
      building_name: building.building_name,
      agency: building.agent,
      // Set the user id
      author: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
