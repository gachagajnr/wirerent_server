// Initializes the `sms` service on path `/sms`
const { Sms } = require("./sms.class");
const createModel = require("../../models/sms.model");
const hooks = require("./sms.hooks");
const twilio = require("twilio");

module.exports = function (app) {
  const AfricasTalking = require("africastalking")({
    apiKey: process.env.AFRICASTALKINGKEY,
    username: process.env.AFRICASTALKINGUSERNAME,
  });

  // Initialize our service with any options it requires
  app.use("/sms", {
    async create(data, params) {
      const options = {
        from: data.from,
        to: data.to,
        message: data.message,
      };
      return await AfricasTalking.SMS.send(options);
    },
  });
  // Get our initialized service so that we can register hooks
  const service = app.service("sms");

  service.hooks(hooks);
};
