// buildings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "buildings";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      floors: { type: Number, required: true },
      agent: { type: Schema.Types.ObjectId, ref: "agents", required: true },
      location: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      description: { type: String, required: true },
      street: { type: String, required: true },
      caretakerName: { type: String, required: true },
      caretakerPhone: { type: String, required: true },
      bills: [{ type: String, required: true }],
      miscellaneous: [{ type: String, required: true }],
      code: { type: String, required: true, unique:true },
      isVerified: { type: Boolean, default: false },
      latitudes: { type: Array },
      payment: { type: Object, required: true },
      utypes: { type: Array, required: true },
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
