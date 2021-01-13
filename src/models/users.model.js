// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new mongooseClient.Schema(
    {
      firstName: { type: String },
      surname: { type: String },
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
      auth0Id: { type: String },
      phone: { type: String },
      organization_name: { type: String },
      googleId: { type: String },
      profilePicture: { type: String },
      role: { type: String, default: undefined },
      resetPassword: { type: Boolean, default: false },
      isRoot: { type: Boolean, default: false },
      isVerified: { type: Boolean },
      agency: { type: Schema.Types.ObjectId, ref: "agents", default: null },
      building: { type: Schema.Types.ObjectId, ref: "buildings", default: null },

      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: { type: Object },
      resetToken: { type: String },
      // verifyShortToken: { type: String },
      // resetShortToken: { type: String }, // Stores the rest token

      resetExpires: { type: Date },
      isAdminVerified: { type: Boolean, default: false },
      organization: {
        type: mongooseClient.Schema.Types.ObjectId,
        default: null,
      },
      rooms: [
        {
          type: mongooseClient.Schema.Types.ObjectId,
          ref: "chat-rooms",
          default: null,
        },
      ],
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
