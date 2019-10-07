var express = require('express');
var personalDataAnalyzer = require('../controllers/mapAnalyzerController');
var bodyParser = require('body-parser');

module.exports = {
  router: () => {
    var router = express.Router();

    router.use('/', bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use('/', personalDataAnalyzer.getData);

    return router;
  }
};
