// Initializes the `agents` service on path `/agents`
const { Agents } = require('./agents.class');
const createModel = require('../../models/agents.model');
const hooks = require('./agents.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agents', new Agents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agents');

  service.hooks(hooks);
};
