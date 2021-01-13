// Initializes the `upload-receipts` service on path `/upload-receipts`
const { UploadReceipts } = require('./upload-receipts.class');
const hooks = require('./upload-receipts.hooks');
const blobService = require("feathers-blob");
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require("fs-blob-store");
const blobStorage = fs("./public/uploads");

const multer = require("multer");
const multipartMiddleware = multer();

module.exports = function (app) {
   // Initialize our service with any options it requires
  app.use(
    "/upload-receipts",
    multipartMiddleware.single("uri"),

    // another middleware, this time to
    // transfer the received file to feathers
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage })
  );
  // Get our initialized service so that we can register hooks
  const service = app.service('upload-receipts');

  service.hooks(hooks);
};
