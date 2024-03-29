import logger from '../helpers/logging'
import responseTime from 'response-time'
import express from 'express';

export default responseTime((req: express.Request, res: express.Response, time: number) => {
    if (!(req.originalUrl.startsWith("/admin") || req.originalUrl.startsWith("/ping") || req.originalUrl.startsWith("/coverage"))) {
        if (res.statusCode > 350) {
            logger.log('error', `${req.method} ${req.originalUrl}`, {
                path: req.originalUrl,
                statusCode: <number>res.statusCode,
                time: time,
                method: req.method,
                payload: JSON.stringify(req.body, null, 4),
            });
            return;
        }

        logger.log('info', `${req.method} ${req.originalUrl}`, {
            path: req.originalUrl,
            statusCode: <number>res.statusCode,
            time: time,
            method: req.method
        });
    }
});
