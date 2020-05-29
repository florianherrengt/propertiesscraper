"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractInfo = void 0;
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const _ = require("lodash");
const cliProgress = require("cli-progress");
const rightmove_1 = require("./parsers/rightmove");
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
function nGram(n, value) {
    let index = value.length - n + 1;
    if (index < 1) {
        return [];
    }
    const nGrams = [];
    const cleanedValue = value
        .toLowerCase()
        .replace(/ +(?= )/g, '')
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/ +(?= )/g, '')
        .trim()
        .split(' ');
    while (index--) {
        nGrams[index] = cleanedValue.slice(index, index + n);
    }
    return nGrams;
}
exports.extractInfo = () => {
    const fileNames = _.flatten(rightmove_1.regions.map(({ name }) => fs
        .readdirSync(path.join(__dirname, '../data/rightmove/' + name))
        .filter((d) => d.endsWith('.html'))
        .map((filename) => name + '/' + filename)));
    progressBar.start(fileNames.length, 0);
    const bigrams = _.flatten(fileNames.map((fileName) => {
        progressBar.increment(1);
        const file = fs.readFileSync(path.join(__dirname, `../data/rightmove/${fileName}`), 'utf-8');
        const $ = cheerio.load(file);
        const description = $('#description')
            .text()
            .replace(/\n/gi, '')
            .replace(/\t/gi, '');
        return nGram(2, description).reduce((accumulator, currentValue) => [
            ...accumulator,
            currentValue.join('|'),
        ], []);
    }));
    progressBar.stop();
    fs.writeFileSync(path.join(__dirname, '../data/frequency.json'), JSON.stringify(_.orderBy(Object.entries(_.countBy(bigrams)).map(([words, frequency]) => ({
        words,
        frequency,
    })), 'frequency', 'desc'), null, 2), 'utf8');
};
exports.extractInfo();
//# sourceMappingURL=extractInfo.js.map