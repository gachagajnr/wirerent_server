// payment-info-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "paymentInfo";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      mode: { type: String, required: true }, // like cheque, cash
      accountNumber: { type: String, required: true }, //account number
      bank: { type: String,   }, //bank name
      accountName: { type: String, required: true }, //account display name
      branch: { type: String }, //bank branch
      description: { type: String, required: true }, // more info
      building: { type: Schema.Types.ObjectId, ref: "buildings", required: true }, //respective building
      agency: { type: Schema.Types.ObjectId, ref:'agents', required: true },
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
