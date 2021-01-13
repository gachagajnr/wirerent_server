// Initializes the `chat-rooms` service on path `/chat-rooms`
const { ChatRooms } = require('./chat-rooms.class');
const createModel = require('../../models/chat-rooms.model');
const hooks = require('./chat-rooms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chat-rooms', new ChatRooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chat-rooms');

  service.hooks(hooks);
};
