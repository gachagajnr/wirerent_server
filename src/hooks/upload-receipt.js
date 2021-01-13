// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data, params } = context;

    if (!data) {
      throw new Error("no data");
    }
    const user = params.user;
    await app
      .service("upload-receipts")
      .create({ uri: data.uri })
      .then((res) => {

        context.data = {
          amountPaid: data.paid,
          paidOn: data.date,
          receiptName: res.id,
          receipt: data.room,
          author: user._id,
        };
      })
      .catch((e) => {
        throw new Error("Not successful");
      });

    return context;
  };
};
