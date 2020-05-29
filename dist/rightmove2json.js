"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightmove2json = void 0;
// ts-node -e 'require("./src/rightmove2json.ts").rightmove2json()'
const fs = require("fs");
const path = require("path");
const node_fetch_1 = require("node-fetch");
const cheerio = require("cheerio");
exports.rightmove2json = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const file = fs.readFileSync(path.join(__dirname, '../data/rightmove-london.txt'), 'utf-8');
    const urls = file.split('\n');
    for (const index in urls) {
        try {
            const html = yield (yield node_fetch_1.default(urls[index])).text();
            const $ = cheerio.load(html);
            results.push({
                url: urls[index],
                address: $('#primaryContent .property-header-bedroom-and-price  address')
                    .text()
                    .replace(/\n/gi, '')
                    .replace(/\t/gi, '')
                    .trim(),
                imageUrl: $('#primaryContent .gallery-main-img img').attr('src'),
                description: $('#primaryContent #description p[itemprop="description"]')
                    .text()
                    .replace(/\n/gi, '')
                    .replace(/\t/gi, '')
                    .trim(),
            });
            yield new Promise((resolve) => setTimeout(() => resolve(), 1000));
        }
        catch (error) {
            console.error(error);
            console.error(urls[index]);
        }
    }
    fs.writeFileSync(path.join(__dirname, '../data/rightmove-london.json'), JSON.stringify(results), 'utf-8');
    return results;
});
//# sourceMappingURL=rightmove2json.js.map