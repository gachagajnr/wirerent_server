// chat-rooms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "chatRooms";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String },
      repliedBy: { type: Schema.Types.ObjectId, ref: "users" },
      isReplied: { type: Boolean, default: false },
      isEnded: { type: Boolean, default: false },
      roomId: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
      // messages: [{ type: Schema.Types.ObjectId, ref:'chats'  }],
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
