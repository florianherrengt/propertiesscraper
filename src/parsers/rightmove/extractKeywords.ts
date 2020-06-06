import * as cheerio from 'cheerio';
import { cleanText } from '../cleanText';

export const extractKeywords = (html: string) => {
    const $ = cheerio.load(html);
    const keyFeatures = cleanText($('#description .key-features ul').text());
    const description = cleanText($('p[itemprop="description"]').text());
    return [keyFeatures, description].join(' ');
};
