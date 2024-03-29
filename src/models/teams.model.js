// teams-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "teams";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      expertise: { type: String, required: true },
      agency: { type: Schema.Types.ObjectId, ref: "agents" },
      agency_name: { type: String, required: true },
      tasks: { type: Schema.Types.ObjectId, ref: "requests" },
      leader_name: { type: String, required: true },
      leader_email: { type: String, required: true },
      leader_phone: { type: String, required: true },
      leader: { type: Schema.Types.ObjectId, ref: 'users' },
      members: { type: Array, required: true },
      isApproved:{type:Boolean, default:false}
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
