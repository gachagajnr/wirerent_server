// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
     const { app, result } = context;

     // console.log("AFTER", result);
     await app
       .service("add-requests")
       .patch(result.request, { approved: true });

    return context;
  };
};
