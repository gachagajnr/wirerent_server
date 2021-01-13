// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if (!data) {
      throw new Error("A message must have a text");
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const agent = context.data;

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      name: agent.name,
      email: agent.email,
     // admins_phone: agent.admins_phone,
     // idnumber: agent.idnumber,
      website: agent.website,
      headquarters: agent.headquarters,
      address: agent.address,
      phone: agent.phone,
      street: agent.street,
      city: agent.city,
      // Set the user id
      author: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
