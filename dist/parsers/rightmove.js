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
exports.start = exports.getLinks = exports.generateUrl = exports.regions = exports.parseDetails = void 0;
const fs = require("fs");
const path = require("path");
const node_fetch_1 = require("node-fetch");
const cheerio = require("cheerio");
exports.parseDetails = (html) => {
    const $ = cheerio.load(html);
    return $('#description').text();
};
exports.regions = [
    {
        name: 'london',
        value: '87490',
    },
    {
        name: 'liverpool',
        value: '94022',
    },
    {
        name: 'leeds',
        value: '787',
    },
    {
        name: 'newcastle',
        value: '984',
    },
    {
        name: 'hull',
        value: '94430',
    },
    {
        name: 'newport',
        value: '991',
    },
    {
        name: 'brighton',
        value: '93554',
    },
];
exports.generateUrl = (options) => {
    const baseUrl = `https://www.rightmove.co.uk/api/_search?locationIdentifier=REGION^${options.region.value}&maxPrice=650000&numberOfPropertiesPerPage=24&radius=40.0&sortType=2&propertyTypes=flat&primaryDisplayPropertyType=flats&maxDaysSinceAdded=7&includeSSTC=false&viewType=LIST&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false&index=${(options.page - 1) * 24}`;
    return baseUrl;
};
const getHtml = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new Promise((resolve) => setTimeout(resolve, 100));
        return (yield node_fetch_1.default(url)).text();
    }
    catch (error) {
        console.log(`getHtml('${url}')`);
        console.error(error);
        return null;
    }
});
exports.getLinks = (fetch, page = 1, region) => __awaiter(void 0, void 0, void 0, function* () {
    const url = exports.generateUrl({ page, region });
    try {
        const response = yield fetch(url);
        const results = yield response.json();
        for (const index in results.properties) {
            const property = results.properties[index];
            fs.writeFileSync(path.join(__dirname, `../../data/rightmove/${region.name}/${property.id}.json`), JSON.stringify(property));
            fs.writeFileSync(path.join(__dirname, `../../data/rightmove/${region.name}/${property.id}.html`), (yield getHtml('https://www.rightmove.co.uk' + property.propertyUrl)) || '');
            yield new Promise((resolve) => setTimeout(() => resolve(), 100));
        }
        if (results.pagination.total !== page) {
            yield new Promise((resolve) => setTimeout(() => resolve(), 1000));
            return exports.getLinks(fetch, page + 1, region);
        }
    }
    catch (error) {
        console.log(page, region, url);
        console.log(error);
    }
});
// export const getTopFloorProperties = async (links: string[]) => {
//     const details: Array<{ url; description }> = [];
//     for (const link of links) {
//         const html = await nodeFetch('https://www.rightmove.co.uk' + link);
//         details.push({
//             url: link,
//             description: parseDetails(await html.text()),
//         });
//         await new Promise((resolve) => setTimeout(() => resolve(), 1000));
//     }
//     const topFloorProperties = details
//         .filter(({ description }) =>
//             description.toLowerCase().includes('top floor'),
//         )
//         .map(({ url }) => 'https://www.rightmove.co.uk' + url);
//     topFloorProperties.forEach((url) => {
//         fs.appendFileSync(
//             path.join(__dirname, '../../data/rightmove-london.txt'),
//             url + '\n',
//             'utf8',
//         );
//     });
//     return topFloorProperties;
// };
exports.start = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const index in exports.regions) {
        const region = exports.regions[index];
        console.log(region.name + '\n');
        yield exports.getLinks(node_fetch_1.default, 1, region);
    }
});
// start();
//# sourceMappingURL=rightmove.js.map