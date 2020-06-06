import * as express from 'express';
import * as lunr from 'lunr';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';
import { PropertyModel } from './models/property';
import { start as parseRightmove } from './parsers/rightmove';
import * as cron from 'node-cron';

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

    app.get('/healthz', (_, response) => response.sendStatus(200));

    app.get('/search/:terms', (request, response) => {
        response.json(propertyModel.search(request.param('terms')));
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
