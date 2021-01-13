// single-sms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "singleSms";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      text: { type: String, required: true },
      to: { type: String, required: true },
      recepient: { type: Schema.Types.ObjectId, ref: "users", required: true },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
        required: true,
      },
      hse: { type: String },
      name: { type: String },
      surname: { type: String },
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
