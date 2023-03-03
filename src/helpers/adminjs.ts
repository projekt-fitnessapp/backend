import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJS from 'adminjs'
import { LogEntry } from './logging.entity'

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
            showProperties: ['message', 'level', 'timestamp', 'statusCode', 'time', 'path', 'method'],
            sort: {
                sortBy: 'timestamp',
                direction: 'desc'
            }
        }
      }]
    }
  
    

    const adminJS = new AdminJS(adminOptions)
    adminJS.watch()
  
    export default AdminJSExpress.buildRouter(adminJS)
  
  