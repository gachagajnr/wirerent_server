// agents-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "agents";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      website: { type: String,   },
      //admin: { type: Schema.Types.ObjectId, ref: "users", required: false },
      phone: { type: String, required: true, unique: true },
      // admins_phone: { type: String, required: true },
      //idnumber: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      headquarters: { type: String },
      address: { type: String },
      street: { type: String },
      city: { type: String },
      // isVerified: { type: Boolean, default: false },
      // buildings: [{ type: Schema.Types.ObjectId, ref: "buildings" }],
      // rooms: [{ type: Schema.Types.ObjectId, ref: "rooms" }],
      // admins: [{ type: Schema.Types.ObjectId, ref: "users" }],
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
