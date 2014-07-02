var linksController = require('./linkController.js');

module.exports = function (app) {
  app.param('code', linksController.findUrl);

  app.route('/')
    .get(linksController.allLinks)
    .post(linksController.newLink);

  app.get('/:code', linksController.navToLink);

};
