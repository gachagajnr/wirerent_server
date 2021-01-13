// admins-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = "building-admins";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      // email: { type: String, required: true, unique: true },
      // firstname: { type: String },
      // middlename: { type: String },
      // lastname: { type: String },
      // tel1: { type: String },
      // tel2: { type: Number },
      // right: { type: String },
      // residence: { type: String },
      // idnumber: { type: String },
      // age: { type: Number },
      // sex: { type: String },
      // user: { type: Schema.Types.ObjectId, ref: "users" },
      // organization: {
      //   type: Schema.Types.ObjectId,
      //   ref: "agents",
      //   required: true,
      // },
      // isApproved: { type: Boolean, default: false, required: true },
      // // user: { type: Schema.Types.ObjectId, ref: "users" },
      // author: { type: Schema.Types.ObjectId, ref: "users", required: true },

      email: { type: String, required: true, unique: true },
      firstname: { type: String, required: true },
      middlename: { type: String, required: true },
      lastname: { type: String, required: true },
      tel1: { type: Number, required: true },
      tel2: { type: Number, required: true },
      //right: { type: String, required: true },
      residence: { type: String, required: true },
      idnumber: { type: String, required: true },
      age: { type: Number, required: true },
      sex: { type: String, required: true },
      organization: {
        type: Schema.Types.ObjectId,
        ref: "buildings",
        required: true,
      },
      agency: {
        type: Schema.Types.ObjectId,
        ref: "agents",
        required: true,
      },

      status: { type: String, default: "active" },
      isApproved: { type: Boolean, default: false },
      building: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "users" },
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
