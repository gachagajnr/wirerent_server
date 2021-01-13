// Initializes the `building-mass-sms` service on path `/building-mass-sms`
const { BuildingMassSms } = require('./building-mass-sms.class');
const createModel = require('../../models/building-mass-sms.model');
const hooks = require('./building-mass-sms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/building-mass-sms', new BuildingMassSms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('building-mass-sms');

  service.hooks(hooks);
};
