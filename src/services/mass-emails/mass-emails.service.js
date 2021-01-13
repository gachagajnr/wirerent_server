// Initializes the `mass-emails` service on path `/mass-emails`
const { MassEmails } = require('./mass-emails.class');
const createModel = require('../../models/mass-emails.model');
const hooks = require('./mass-emails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mass-emails', new MassEmails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mass-emails');

  service.hooks(hooks);
};
