import { createLogger, format, transports } from 'winston'
import dotenv from 'dotenv'
import Transport from "winston-transport"
import { MongoClient } from "mongodb"

dotenv.config()

export enum LogLevels {
  INFO = "info",
  ERROR = "error",
  WARN = "warn"
}
class MongoTransport extends Transport {
  private dbclient: MongoClient;
  constructor(opts: any, dbUrl: string) {
    //connect to logging db
    super(opts);
    this.dbclient = new MongoClient(dbUrl)
    this.dbclient.connect()
  }
  //@ts-expect-error no typings
  async log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    //convert timestamp to Date and convert to MEZ
    if (info.timestamp) {
      info.timestamp = new Date(info.timestamp)
    }
    await this.dbclient.db(process.env.LOGS_DB as string).collection('logs').insertOne(info)

    callback();
  }
}

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new (transports.File)({
      filename: 'winston.log',
    }),
    new (transports.Console)()
  ]
});

//Only log to mongo in prod
if (process.env.LOGS_MONGO_ACTIVE == 'true') {
  logger.add(new MongoTransport({}, process.env.DB_URL as string))
}

export default logger

