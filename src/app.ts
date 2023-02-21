import { setupServer, connectDB } from './server';
import basicAuth from 'express-basic-auth';


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
connectDB(false, logger);

app.listen(parseInt(process.env.PORT as string), () => {
  logger.log('info', `App started on  http://localhost:${process.env.PORT}`);
});
