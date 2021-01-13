// Initializes the `single-sms` service on path `/single-sms`
const { SingleSms } = require('./single-sms.class');
const createModel = require('../../models/single-sms.model');
const hooks = require('./single-sms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/single-sms', new SingleSms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('single-sms');

  service.hooks(hooks);
};
