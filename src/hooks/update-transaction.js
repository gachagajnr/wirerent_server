// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;
    const receipt = await app.service("receipts").get(result.receipt);

    await app.service("receipts").patch(receipt._id, {
      receiptName: result.receiptName,
      receipt:result._id,
      hasRequestedReceipt:false
    });
    return context;
  };
};
