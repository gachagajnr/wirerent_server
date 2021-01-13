// Initializes the `agency-admins` service on path `/agency-admins`
const { AgencyAdmins } = require('./agency-admins.class');
const createModel = require('../../models/agency-admins.model');
const hooks = require('./agency-admins.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agency-admins', new AgencyAdmins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agency-admins');

  service.hooks(hooks);
};
