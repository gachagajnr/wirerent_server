// Initializes the `building-mass-emails` service on path `/building-mass-emails`
const { BuildingMassEmails } = require('./building-mass-emails.class');
const createModel = require('../../models/building-mass-emails.model');
const hooks = require('./building-mass-emails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/building-mass-emails', new BuildingMassEmails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('building-mass-emails');

  service.hooks(hooks);
};
