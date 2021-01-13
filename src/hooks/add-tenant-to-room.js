// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    await app
      .service("users")
      .patch(result.user, { organization: result.room, role: "tenant" });
    await app
      .service("rooms")
      .patch(result.room, {
        isOccupied: true,
        isVacant: false,
        tenant: result.user,
      });
    return context;
  };
};
