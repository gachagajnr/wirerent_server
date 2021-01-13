// Initializes the `addRequests` service on path `/add-requests`
const { AddRequests } = require('./add-requests.class');
const createModel = require('../../models/add-requests.model');
const hooks = require('./add-requests.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/add-requests', new AddRequests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('add-requests');

  service.hooks(hooks);
};
