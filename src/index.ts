import * as express from 'express';
import * as lunr from 'lunr';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';

const app = express();

app.use(cors());

const dataset: any[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/dataset.json'), 'utf-8'),
);

const idx = lunr(function () {
    this.ref('id');
    this.field('description');
    dataset.forEach(function (doc) {
        this.add(doc);
    }, this);
});

app.get('/search/:terms', (request, response) => {
    const results = idx
        .search(request.param('terms'))
        .slice(0, 100)
        .map(({ ref }) => parseInt(ref, 10));

    // response.json({ ok: 1 });
    response.json(dataset.filter(({ id }) => results.includes(id)));
});

const PORT = process.env.NODE_PORT || process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server listing on port ' + PORT);
});
