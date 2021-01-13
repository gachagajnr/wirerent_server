// rooms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "rooms";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      //reject by note
      identity: { type: String, required: true },
      building: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
        required: true,
      },
      agent: {
        type: Schema.Types.ObjectId,
        ref: "agents",
      },
      tenant: { type: Schema.Types.ObjectId, ref: "users", default: null },
      type: { type: String, required: true },
      meterno: { type: String, unique: true },
      signed: { type: Boolean },
      notes: { type: String },
      isVacant: { type: Boolean, default: true },
      building_name: { type: String, required: true },
      floor: { type: String, required: true },
      isOccupied: { type: Boolean, dafault: false },
      movingOutStatus: { type: String, default: null },
      movingOutDate: { type: String, default: null },
      idnumber: { type: String },
      payment: { type: Object },
      action: { type: String },
      since: { type: Date,  default:null },

      moveoutRequested: { type: Boolean, default: false },
      moveoutApproved: { type: Boolean, default: false },
      moveoutNotes: { type: String },
      request: {
        type: Schema.Types.ObjectId,
        ref: "add-requests",
         default:null
      },
      rent: { type: Number, required: true },
      quote: { type: Number, default: 0 },
      bills: [{ type: String, required: true }],
      features: [{ type: String, required: true }],
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
