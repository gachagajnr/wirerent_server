// tenants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "tenants";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      agency: { type: Schema.Types.ObjectId, ref: "agents" },
      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
      },
      room: { type: Schema.Types.ObjectId, ref: "rooms" },
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true, unique: true },
      idnumber: { type: Number },
      notes: { type: String, default: "none" },
      paidVia: { type: String },
      name: { type: String },
      surname: { type: String },
      room_name: { type: String },
      signed: { type: Boolean },

      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
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
