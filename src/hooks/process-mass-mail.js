// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
      const email = context.data;
      // console.log(email);

      context.data = {
        title: email.title,
        message: email.message,
        organization: email.agent,
      };


    return context;
  };
};
