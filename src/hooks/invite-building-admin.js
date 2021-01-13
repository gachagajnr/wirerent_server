// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    console.log("from creating agen admin", result);

    const data = await app.service("users").create({
      email: result.email,
      password: result.idnumber,
      role: "building_admin",
      phone: result.tel1,
      organization: result.organization,
      resetPassword: true,
      isAdminVerified: false,
    });
    console.log("user created successfully", data);

    if (data) {
      const rrr = await app.service("building-admins").patch(result._id, {
        user: data._id,
      });
      console.log("with the remaining", rrr);
    }
    return context;
  };
};
