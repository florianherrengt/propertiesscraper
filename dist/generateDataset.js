"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDataset = void 0;
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const _ = require("lodash");
const cliProgress = require("cli-progress");
const rightmove_1 = require("./parsers/rightmove");
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
exports.generateDataset = () => {
    const fileNames = _.flatten(rightmove_1.regions.map(({ name }) => fs
        .readdirSync(path.join(__dirname, '../data/rightmove/' + name))
        .filter((d) => d.endsWith('.html'))
        .map((filename) => name + '/' + filename)));
    progressBar.start(fileNames.length, 0);
    const dataset = fileNames.map((fileName) => {
        progressBar.increment(1);
        const html = fs.readFileSync(path.join(__dirname, '../data/rightmove', fileName), 'utf-8');
        const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/rightmove', fileName.replace('.html', '.json')), 'utf-8'));
        const $ = cheerio.load(html);
        return {
            id: meta.id,
            region: fileName.split('/')[0],
            imageUrl: meta.propertyImages.mainImageSrc,
            summary: meta.summary,
            websiteUrl: 'https://rightmove.co.uk' + meta.propertyUrl,
            description: $('#description .agent-content')
                .text()
                .toLowerCase()
                .replace(/\n/gi, '')
                .replace(/\t/gi, '')
                .replace(/ +(?= )/g, '')
                .replace(/[^a-zA-Z\s]/g, '')
                .replace(/ +(?= )/g, ''),
        };
    });
    fs.writeFileSync(path.join(__dirname, '../data/dataset.json'), JSON.stringify(dataset), 'utf-8');
    progressBar.stop();
};
//# sourceMappingURL=generateDataset.js.map