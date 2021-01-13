// receipts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "receipts";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      status: { type: String, required: true },
      refno: { type: String, required: true, unique: true },
      amount: { type: String, required: true },
      depositedBy: { type: String, required: true },
      depositedAt: { type: String, required: true },
      roomName: { type: String, required: true },
      receiptName: { type: String },
      receipt: { type: Schema.Types.ObjectId, ref: "transactions" },
      buildingName: { type: String, required: true },
      paidOn: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
      hasRequestedReceipt: { type: Boolean, default: false },
      room: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
        required: true,
      },
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
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
