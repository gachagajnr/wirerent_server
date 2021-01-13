// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data } = context;
console.log(data)
    if (data.type === "move") {
      console.log(data);
      context.data = {
        moveoutRequested: true,
        action: "move",
      };
    } else if (data.type === "cancel") {
      console.log(data);

      context.data = {
        moveoutRequested: false,
        action: data.type,
      };
    } else if (data.type === "vacate") {
      context.data = {
        action: data.type,
        isVacant: true,
        isOccupied: false,
        tenant: null,
        moveoutRequested: false,
        moveoutApproved: false,
        request: null,
        signed: false,
        idnumber: "",
        since: null,
        notes: "",
      };
    } else {
      const req = await app.service("add-requests").get(data.request);
      console.log(req);

      context.data = {
        mode: data.mode,
        request: req._id,
        signed: data.signed,
        idnumber: data.idnumber,
        isOccupied: data.isOccupied,
        isVacant: data.isVacant,
        tenant: req.user,
        since: new Date(),
        notes: data.notes,
        action:'new'
      };
    }

    return context;
  };
};
