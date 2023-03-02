import {createLogger, format, transports} from 'winston'

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

export default logger