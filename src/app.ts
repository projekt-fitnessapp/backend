import { setupServer, connectDB } from './server';
import basicAuth from 'express-basic-auth';
import logger from './helpers/logging';
import loggingMiddleware from './middleware/logging.middleware';
//@ts-expect-error no type declarations available
import winstonVisualize from 'winston-visualize'


const app = setupServer(false);

/**
 * Begin Important Logging Code do not remove or alter 
 */
function getUnauthorizedResponse() {
  return 'You shall not pass'
}

app.use('/logs*', basicAuth({
  users: { 'logs': 'supersecretlogpasswort' },
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
}))

app.use(loggingMiddleware);

winstonVisualize(app, logger);

process.on("uncaughtExceptionMonitor", (err)=>{
  logger.log('error', err.toString());
});


/**
 * End important logging code - please look above for instructions
 */


connectDB(false, logger);

app.listen(parseInt(process.env.PORT as string), () => {
  logger.log('info', `App started on  http://localhost:${process.env.PORT}`);
});
