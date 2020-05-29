import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import * as cliProgress from 'cli-progress';
import { regions } from './parsers/rightmove';

const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
);

function nGram(n: number, value: string): string[][] {
    let index: number = value.length - n + 1;
    if (index < 1) {
        return [];
    }

    const nGrams: string[][] = [];

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

export const extractInfo = () => {
    const fileNames = _.flatten(
        regions.map(({ name }) =>
            fs
                .readdirSync(path.join(__dirname, '../data/rightmove/' + name))
                .filter((d) => d.endsWith('.html'))
                .map((filename) => name + '/' + filename),
        ),
    );

    progressBar.start(fileNames.length, 0);

    const bigrams = _.flatten(
        fileNames.map((fileName) => {
            progressBar.increment(1);
            const file = fs.readFileSync(
                path.join(__dirname, `../data/rightmove/${fileName}`),
                'utf-8',
            );
            const $ = cheerio.load(file);
            const description = $('#description')
                .text()
                .replace(/\n/gi, '')
                .replace(/\t/gi, '');
            return nGram(2, description).reduce(
                (accumulator, currentValue) => [
                    ...accumulator,
                    currentValue.join('|'),
                ],
                [],
            );
        }),
    );
    progressBar.stop();
    fs.writeFileSync(
        path.join(__dirname, '../data/frequency.json'),
        JSON.stringify(
            _.orderBy(
                Object.entries(_.countBy(bigrams)).map(
                    ([words, frequency]) => ({
                        words,
                        frequency,
                    }),
                ),
                'frequency',
                'desc',
            ),
            null,
            2,
        ),
        'utf8',
    );
};

extractInfo();
