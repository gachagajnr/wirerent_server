// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data } = context;

    if (!data) {
      throw new Error("no data");
    }
    await app
      .service("uploads")
      .create({ uri: data.uri })
      .then((res) => {
        context.data = {
          name: data.name,
          phone: data.phone,
          phone2: data.phone2,
          address: data.address,
          town: data.phone,
          city: data.city,
          idnumber: data.idnumber,
          img: res.id,
        };
      })
      .catch((e) => {
        throw new Error("Not successful");
      });

    return context;
  };
};
