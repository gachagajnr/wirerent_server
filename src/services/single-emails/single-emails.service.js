// Initializes the `single-emails` service on path `/single-emails`
const { SingleEmails } = require('./single-emails.class');
const createModel = require('../../models/single-emails.model');
const hooks = require('./single-emails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/single-emails', new SingleEmails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('single-emails');

  service.hooks(hooks);
};
