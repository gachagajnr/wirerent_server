// Initializes the `admins` service on path `/admins`
const { BuildingAdmins } = require("./building-admins.class");
const createModel = require('../../models/building-admins.model');
const hooks = require('./building-admins.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/building-admins', new BuildingAdmins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('building-admins');

  service.hooks(hooks);
};
