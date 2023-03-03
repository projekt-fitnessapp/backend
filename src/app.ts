import { setupServer, connectDB } from './server';
import basicAuth from 'express-basic-auth';
import logger from './helpers/logging';
import loggingMiddleware from './middleware/logging.middleware';
import adminjs from './helpers/adminjs';
//@ts-expect-error no type declarations available
import winstonVisualize from 'winston-visualize'

const app = setupServer(false);
connectDB(false, logger).then(() => {



  /**
   * Begin Important Logging Code do not remove or alter 
   */


  function getUnauthorizedResponse() {
    return 'You shall not pass'
  }
  app.use('/logs*', basicAuth({
    users: { 'logs': process.env.LOGS_PASSWORD as string },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
  }))


  app.use(loggingMiddleware);

  winstonVisualize(app, logger);

  //only use adminjs in prod
  if (process.env.LOGS_MONGO_ACTIVE) {
    app.use('/admin', adminjs)
  }

  process.on("uncaughtExceptionMonitor", (err) => {
    logger.log('error', err.toString());
  });


  /**
   * End important logging code - please look above for instructions
   */

  app.listen(parseInt(process.env.PORT as string), () => {
    logger.log('info', `App started on  http://localhost:${process.env.PORT}`);
  });
})



