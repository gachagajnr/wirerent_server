// Initializes the `special-notices` service on path `/special-notices`
const { SpecialNotices } = require('./special-notices.class');
const createModel = require('../../models/special-notices.model');
const hooks = require('./special-notices.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/special-notices', new SpecialNotices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('special-notices');

  service.hooks(hooks);
};
