const log = require('./log')
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const handler = require('./controllers/handlerController')
const livecheck = require('./routes/livecheck')
const personalDataAnalyzer=require('./routes/personalDataAnalyzer');

const cors = require('cors')

module.exports = createServer();

function createServer(){

  let port = 5000;

  const errorFile = fs.createWriteStream('./logs/errors.log', { flags: 'a' });
  process.__defineGetter__('stderr', () => {
    return errorFile;
  });

  const app = express();

  app.use(cors())

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('*', handler.requestLogging);

  app.use('/livecheck', livecheck.router());

  app.use('/personalData/location', personalDataAnalyzer.router());


  app.get('*', (req,res) => {
    res.send('Hello this is Allan AI personl data analyzer, please use our website to access the magic')
  })

  app.listen(process.env.PORT || port, (err) =>{
    if (err) throw err
    console.log(`Allan AI backend is listening on port ${port}`);
    log.info(`Allan AI backend listening on port ${port}}`);
  })


  process.on('SIGBREAK', () => shutdown());
  process.on('SIGINT', () => shutdown());
  process.on('SIGTERM', () => shutdown());

}

function shutdown () {
  log.info('Stopping...');
  process.exit();
}
