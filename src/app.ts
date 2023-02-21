import { setupServer, connectDB } from './server';
import express from 'express';
import responseTime from 'response-time'

const app = setupServer(false);

/**
 * Begin Important Logging Code do not remove or alter 
 */
const {createLogger, format, transports} = require('winston');

const logger = createLogger({
  format: format.combine(
      format.timestamp(),
      format.json()
  ),
  transports: [
      new (transports.File)({
          filename: 'winston.log'
      }),
      new (transports.Console)()
  ]
});

require('winston-visualize')(app, logger);

process.on("uncaughtExceptionMonitor", (err)=>{
  logger.log('error', err.toString());
});

/**
 * End important logging code - please look above for instructions
 */

app.use(
  responseTime((req: express.Request, res: express.Response, time: number) => {
    if (res.statusCode > 350) {
      logger.log('info', `${req.method} ${req.originalUrl}`, {
        path: req.originalUrl,
        statusCode: <number>res.statusCode,
        time: time,
        method: req.method,
        payload: {
          body: req.body,
          query: req.query
        }
      });
      return;
    }

    logger.log('info', `${req.method} ${req.originalUrl}`, {
      path: req.originalUrl,
      statusCode: <number>res.statusCode,
      time: time,
      method: req.method
    });
  })
);

connectDB(false, logger);

app.listen(parseInt(process.env.PORT as string), () => {
  logger.log('info', `App started on  http://localhost:${process.env.PORT}`);
});
