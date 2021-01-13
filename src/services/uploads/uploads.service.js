// Initializes the `uploads` service on path `/uploads`

const blobService = require("feathers-blob");
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require("fs-blob-store");
const blobStorage = fs("./public/profiles");

const multer = require("multer");
const multipartMiddleware = multer();

const hooks = require("./uploads.hooks");

module.exports = function () {
  const app = this;
  const paginate = app.get("paginate");
  // Initialize our service with any options it requires
  app.use(
    "/uploads",

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
  const service = app.service("uploads");

  service.hooks(hooks);
};
