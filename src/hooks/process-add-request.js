// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, params, app } = context;
    const user = params.user;

    const building = await app.service("buildings").find({
      query: { code: data.code, $limit: 1, $select: ["_id", "name", "agent"] },
    });
    if (building.total === 0) {
      throw new Error("Does not Exist");
    }
    console.log(building);
    //console.log(params.user);

    //  code: { type: String, required: true },
    //   building: { type: String, required: true },
    //   author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    //   firstName: { type: String, required: true },
    //   surname: { type: String, required: true },
    //   email: { type: String, required: true },
    //   phone: { type: String, required: true },
    context.data = {
      firstName: user.firstName,
      surname: user.surname,
      organization_name: user.organization_name,
      phone: user.phone,
      user:  user._id,
      agency: building.data[0].agent,
      email: user.email,
      building: building.data[0]._id,
      building_name: building.data[0].name,
      code: data.code,
      author: user._id,
    };
    return context;
  };
};
