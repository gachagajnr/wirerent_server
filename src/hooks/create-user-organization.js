// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    console.log("AFTER CREATING USER", result);
    if (result.role === "agency_admin") {
      const data = {
        name: result.organization_name,
        email: result.email,
        phone: result.phone,
        author: result._id,
      };
      const res = await app.service("agents").create(data);
      console.log("AFETR CREATING AGENCY", res);
    }
    // else {
    //   const data = {
    //     room_name: result.organization_name,
    //     email: result.email,

    //     phone: result.phone,
    //     name: result.firstName,
    //     surname: result.surname,

    //     user: result._id,
    //     author: result._id,
    //   };
    // //  const res = await app.service("tenants").create(data);
    //  // console.log("AFETR CREATING TENANT", res);
    // }
    return context;
  };
};
