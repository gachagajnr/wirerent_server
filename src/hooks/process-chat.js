// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { data, app } = context;

    // Throw an error if we didn't get a text
    if (!data) {
      throw new Error("A message must have a text");
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text

    const chat = context.data;
    // const recipient = await app.service("users").get(chat.to);
    // console.log("555555", chat);


    // Override the original data (so that people can't submit additional stuff)
    context.data = {

      message: chat.message,
      author: user._id,
       chatroom: chat.chatroom,
      // // Add the current date
      // createdAt: new Date().getTime()
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
