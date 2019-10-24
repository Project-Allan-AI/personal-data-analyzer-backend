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

  const locationDataFileContents = fs.readFileSync(locationDataFile);
  const locationData = JSON.parse(locationDataFileContents)

  //count the number of data points
  let datapoints = Object.keys(locationData.locations).length;

  //find the timestampe of all datapoints
  let timeStampArray=[];
  for (let i=0; i<datapoints; i++){
    if (i!=0){
       timeStampArray.push((locationData.locations[i].timestampMs-locationData.locations[i-1].timestampMs)/1000);
    }
  }

  let parsedResult={
    maxInterval: getMax(timeStampArray)/1000,
    minInterval: getMin(timeStampArray)/1000,
    dataIntervals:timeStampArray
  };
  console.log('complete, max time interval:', parsedResult.maxInterval)
  res.json(parsedResult)
}

function getMax(arr) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}

function getMin(arr) {
    let len = arr.length;
    let min = Infinity;

    while (len--) {
        min = arr[len] < min ? arr[len] : min;
    }
    return min;
}

module.exports = {
  getData
};
