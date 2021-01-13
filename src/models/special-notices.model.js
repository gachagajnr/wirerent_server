// special-notices-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'specialNotices';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      to: { type: Schema.Types.ObjectId, ref: "users", required: true },
      room: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String },
      topic: { type: String },
      phone: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
