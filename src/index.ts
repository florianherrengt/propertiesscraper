import * as express from 'express';
import * as lunr from 'lunr';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';
import { PropertyModel } from './models/property';
import { start as parseRightmove } from './parsers/rightmove';
import * as cron from 'node-cron';
import { v4 as uuid } from 'uuid';

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

    app.get('/healthz', (_, response) => {
        response.json({
            ok: 1,
            instanceId,
        });
    });

    app.get('/search/:terms', (request, response) => {
        const properties = propertyModel.search(request.param('terms'));
        response.json(
            properties.map((p) => ({ ...p, websiteUrl: p.domain + p.url })),
        );
    });

    app.use(express.static('assets'));
    app.get('*', (_, response) => {
        response.sendFile(path.join(__dirname + '/../assets/index.html'));
    });

    const PORT = process.env.NODE_PORT || process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log('server listing on port ' + PORT);
    });
})();
