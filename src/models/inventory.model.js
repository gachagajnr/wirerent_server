// inventory-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "inventory";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      agency: { type: Schema.Types.ObjectId, ref: "agents", required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true, default:0 },
      available: { type: Number, default:0},
      remaining: { type: Number },
      serial: { type: String, default:"none" },
      leasedQuantity: { type: Number, default:0 },
      leasedTo: [{ type: Schema.Types.ObjectId, ref: "teams" }],
      author:{type:Schema.Types.ObjectId, ref:'users', required:true}
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
