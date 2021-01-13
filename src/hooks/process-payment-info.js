// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data } = context
    const agent = await app.service('buildings').get(data.building)
    context.data = {
      mode: data.mode,
      accountNumber: data.accountNumber,
      bank: data.bank,
      accountName: data.accountName,
      branch: data.branch,
      description: data.description,
      building: data.building,
      agency:agent.agent
    };
    return context;
  };
};
