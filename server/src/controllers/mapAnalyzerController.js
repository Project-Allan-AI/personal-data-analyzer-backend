const _ = require('underscore');
const log = require('../log');
const handler = require('./handlerController');
const uuidv4 = require('uuid/v4');
var pg = require('pg');
const env = require('../env');
const path = require('path');
const fs = require('fs');

pg.defaults.ssl = true;

const databaseURL = env.databaseURI;
const appRoot = path.join(__dirname,'../../../')


function getData(req, res, next){
  console.log('in getData function');
  const locationDataFile = appRoot + 'myData/Location History.json';

  console.log(locationDataFile);

  const locationDataFileContents = fs.readFileSync(locationDataFile);
  const locationData = JSON.parse(locationDataFileContents)

  console.log(Object.keys(locationData.locations[1]));
}

module.exports = {
  getData
};
