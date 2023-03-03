import { model, Schema } from "mongoose"
import { LogLevels } from "./logging"

export interface ILogEntry {
    message: string
    timestamp: Date
    level: LogLevels
    path?: string
    statusCode?: number
    time?: number
    method?: string
    payload?: any
  }
  
  
  export const LogEntrySchema = new Schema<ILogEntry>(
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
  
  export const LogEntry = model<ILogEntry>('LogEntry', LogEntrySchema, 'logs')