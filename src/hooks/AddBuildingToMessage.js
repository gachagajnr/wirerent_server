// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { app, result } = context;

    console.log("ADDUNJHJH", result);

    const building = await app.service("rooms").get(result.from);
// console.log(building)
    await app.service("chats").patch(result._id, {
      building: building.building,
      building_name: building.building_name,
      sender: building.identity,
    });

    // Best practise, hooks should always return the context
    return context;
  };
};
