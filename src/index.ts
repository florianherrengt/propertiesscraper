import * as express from 'express';
import * as lunr from 'lunr';
import * as fs from 'fs';
import * as expressStaticGzip from 'express-static-gzip';
import * as path from 'path';
import * as cors from 'cors';
import { PropertyModel } from './models/property';
import { start as parseRightmove } from './parsers/rightmove';
import * as cron from 'node-cron';
import { v4 as uuid } from 'uuid';
import * as compression from 'compression';

const instanceId = uuid();

cron.schedule(
    '0 1 * * *',
    () => {
        parseRightmove();
    },
    {
        scheduled: true,
        timezone: 'Europe/London',
    },
);

(async () => {
    const propertyModel = new PropertyModel();
    const app = express();

    app.use(cors());

    app.use('/api', compression());

    app.get('/api/healthz', (_, response) => {
        response.json({
            ok: 1,
            instanceId,
        });
    });

    app.get('/api/search/:terms', (request, response) => {
        const properties = propertyModel.search(request.param('terms'));
        response.json(
            properties.map((p) => ({ ...p, websiteUrl: p.domain + p.url })),
        );
    });

    const staticMiddleware = expressStaticGzip('assets', {
        enableBrotli: true,
    });
    app.use('/', staticMiddleware);
    app.use('*', staticMiddleware);

    const PORT = process.env.NODE_PORT || process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log('server listing on port ' + PORT);
    });
})();
