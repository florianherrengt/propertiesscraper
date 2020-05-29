"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const lunr = require("lunr");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
const dataset = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dataset.json'), 'utf-8'));
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
app.listen(8080, () => {
    console.log('server listing');
});
//# sourceMappingURL=api.js.map