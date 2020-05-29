// ts-node -e 'require("./src/rightmove2json.ts").rightmove2json()'
import * as fs from 'fs';
import * as path from 'path';
import nodeFetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const rightmove2json = async () => {
    const results: Array<{
        url: string;
        address: string;
        imageUrl: string;
        description: string;
    }> = [];
    const file = fs.readFileSync(
        path.join(__dirname, '../data/rightmove-london.txt'),
        'utf-8',
    );
    const urls = file.split('\n');
    for (const index in urls) {
        try {
            const html = await (await nodeFetch(urls[index])).text();

            const $ = cheerio.load(html);
            results.push({
                url: urls[index],
                address: $(
                    '#primaryContent .property-header-bedroom-and-price  address',
                )
                    .text()
                    .replace(/\n/gi, '')
                    .replace(/\t/gi, '')
                    .trim(),
                imageUrl: $('#primaryContent .gallery-main-img img').attr(
                    'src',
                )!,
                description: $(
                    '#primaryContent #description p[itemprop="description"]',
                )
                    .text()
                    .replace(/\n/gi, '')
                    .replace(/\t/gi, '')
                    .trim(),
            });
            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
        } catch (error) {
            console.error(error);
            console.error(urls[index]);
        }
    }
    fs.writeFileSync(
        path.join(__dirname, '../data/rightmove-london.json'),
        JSON.stringify(results),
        'utf-8',
    );
    return results;
};
