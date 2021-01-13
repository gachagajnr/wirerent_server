// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    console.log("is moving", result);

    if (result.requested === "MovingOut" && !result.assigned) {
      console.log("is moving", result.date);
      await app.service("rooms").patch(result.room, {
        movingOutStatus: "Requested",
        movingOutDate: result.date,
        action: result.action,
      });
    }
    return context;
  };
};
