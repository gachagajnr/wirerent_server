// transactions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "transactions";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      amountPaid: { type: String },
      receiptName: { type: String, unique: true },
      paidOn: { type: String },
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      receipt: { type: Schema.Types.ObjectId, ref: "receipts", required: true },
      roomIdentity: { type: String },
      buildingName: { type: String },

      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
      },
      agency: { type: Schema.Types.ObjectId, ref: "agents" },

      // comments: { type: Schema.Types.ObjectId, ref: "comments" },
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
