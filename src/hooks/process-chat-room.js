// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data, app, params } = context
    const user = params.user
    const title = await app.service('rooms').get(data.room)
    context.data = {
      // members: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
      // roomId: { type: String, required: true },
      name:data.name,
      agency:title.agent,
      roomId:data.room,
      author:user._id
    };

    return context;
  };
};
