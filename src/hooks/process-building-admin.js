// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    // Throw an error if we didn't get a text
    if (!data) {
      throw new Error("A message must have a text");
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const admin = context.data;

    const building = await app.service("buildings").get(admin.building);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      firstname: admin.fname,
      middlename: admin.mname,
      lastname: admin.lname,
      idnumber: admin.idnumber,
      tel1:admin.phone,
      tel2:admin.phone2,
      age: admin.age,
      sex: admin.sex,
      residence: admin.residence,
      email: admin.email,
     agency: building.agent,
      organization: building._id,
      building: building.name,
      // Set the user id
      author: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
