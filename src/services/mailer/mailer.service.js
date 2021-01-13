// Initializes the `mailer` service on path `/mailer`
const hooks = require("./mailer.hooks");
const Mailer = require("feathers-mailer");
var pP = require("nodemailer-pepipost-transport");

module.exports = function (app) {
  // Initialize our service with any options it requires

  app.use(
    "/mailer",
    Mailer(
      pP({
        auth: {
          api_key: process.env.PEPIPOSTKEY,
        },
      })
    )
  );

  // const auth = {
  //   auth: {
  //     api_key: process.env.MAILGUN_API_KEY,
  //     domain: process.env.MAILGUN_DOMAIN,
  //   },
  // };

  // app.use("/mailer", Mailer(mg(auth)));

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");

  service.hooks(hooks);
};
