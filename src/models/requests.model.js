// requests-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "requests";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      requested: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String },
      identity: { type: String },
      assigned: { type: Boolean, default: false },
      assignee: { type: String },
      room: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
        required: true,
      },
      building_name: { type: String },
      cancelReason:{type:String},
      action: { type: String },
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
      team: { type: Schema.Types.ObjectId, ref: "teams", default: null },
      teamName: { type: String, default: null },
      reason: { type: String },
      isDone: { type: Boolean, default: false },
      author: { type: Schema.Types.ObjectId, ref: "users" },
      completed: { type: String, default: "requested" },
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
