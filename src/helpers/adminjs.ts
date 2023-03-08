import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJS from 'adminjs'
import { model, Schema } from 'mongoose'
import { LogLevels } from './logging'


interface ILogEntry {
    message: string
    timestamp: Date
    level: LogLevels
    path?: string
    statusCode?: number
    time?: number
    method?: string
    payload?: any
}


const LogEntrySchema = new Schema<ILogEntry>(
    {
        message: { type: 'String', required: true },
        timestamp: { type: 'Date', required: true },
        level: { type: 'String', required: false, enum: LogLevels },
        path: { type: 'String', required: false },
        statusCode: { type: 'Number', required: false },
        time: { type: 'Number', required: false },
        method: { type: 'String', required: false },
        payload: { type: 'Object', required: false }
    },
    { timestamps: true },
)

const LogEntry = model<ILogEntry>('LogEntry', LogEntrySchema, 'logs')

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const adminOptions = {
    // We pass Category to `resources`
    resources: [{
        resource: LogEntry,
        options: {
            listProperties: ['message', 'level', 'timestamp'],
            filterProperties: ['message', 'level', 'timestamp', 'statusCode'],
            editProperties: [],
            showProperties: ['message', 'level', 'timestamp', 'statusCode', 'time', 'path', 'method', 'payload'],
            sort: {
                sortBy: 'timestamp',
                direction: 'desc'
            }
        }
    }]
}


const adminJS = new AdminJS(adminOptions)
adminJS.watch()

export default AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: (email, password) => {
        if (email == 'logadmin' && password == process.env.LOGS_PASSWORD as string) {
            return true;
        }

        return false;
    },
    cookiePassword: 'session Key',
})

