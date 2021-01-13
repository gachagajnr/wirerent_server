// addRequests-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "addRequests";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      code: { type: String, required: true },
      building: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
      firstName: { type: String, required: true },
      surname: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },

      building_name: { type: String, required: true },
      approved: { type: Boolean, default: false },
      flagdown_reason: { type: String, default: "" },
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
