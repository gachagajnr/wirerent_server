// Initializes the `payment-info` service on path `/payment-info`
const { PaymentInfo } = require('./payment-info.class');
const createModel = require('../../models/payment-info.model');
const hooks = require('./payment-info.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/payment-info', new PaymentInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('payment-info');

  service.hooks(hooks);
};
