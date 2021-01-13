// Initializes the `mass-sms` service on path `/mass-sms`
const { MassSms } = require('./mass-sms.class');
const createModel = require('../../models/mass-sms.model');
const hooks = require('./mass-sms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mass-sms', new MassSms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mass-sms');

  service.hooks(hooks);
};
