// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { uuid } = require("uuidv4");

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars


  return async (context) => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if (!data) {
      throw new Error("Data Must Exist");
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const building = context.data;
    const code = uuid();
    // console.log(building);
    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      name: building.name,
      agent: building.agent,
      location: building.location,
      description: building.description,
      floors: building.floors,
      miscellaneous: building.miscellaneous,
      // total: building.total,
      bills: building.bills,
      street: building.street,
      caretakerName: building.caretakerName,
      caretakerPhone: building.caretakerPhone,
      author: user._id,
      code:code,
      payment: {
        mode: building.mode,
        accountNumber: building.accountNumber,
        bank: building.bank,
        accountName: building.accountName,
        branch: building.branch,
        paydescription: building.paydescription,
      },
      utypes:building.utypes,
      // latitudes:building.data,
      // Add the current date
      createdAt: new Date().getTime(),
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
