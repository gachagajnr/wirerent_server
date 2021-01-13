// Initializes the `agency-notices` service on path `/agency-notices`
const { AgencyNotices } = require('./agency-notices.class');
const createModel = require('../../models/agency-notices.model');
const hooks = require('./agency-notices.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agency-notices', new AgencyNotices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agency-notices');

  service.hooks(hooks);
};
