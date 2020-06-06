import nodeFetch from 'node-fetch';
import * as cheerio from 'cheerio';

import { RightmoveResponse } from './RightmoveResponse';
import { PropertyModel } from '../models/property';
import { extractKeywords } from './rightmove/extractKeywords';

export const parseDetails = (html: string) => {
    const $ = cheerio.load(html);
    return $('#description').text();
};

interface Region {
    name: string;
    value: string;
}

export const regions: Region[] = [
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

export const generateUrl = (options: {
    url?: string;
    page: number;
    region: Region;
}) => {
    const baseUrl = `https://www.rightmove.co.uk/api/_search?locationIdentifier=REGION^${
        options.region.value
    }&maxPrice=650000&numberOfPropertiesPerPage=24&radius=40.0&sortType=2&propertyTypes=flat&primaryDisplayPropertyType=flats&maxDaysSinceAdded=1&includeSSTC=false&viewType=LIST&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false&index=${
        (options.page - 1) * 24
    }`;
    return baseUrl;
};

const getHtml = async (url: string): Promise<string | null> => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return (await nodeFetch(url)).text();
    } catch (error) {
        console.log(`getHtml('${url}')`);
        console.error(error);
        return null;
    }
};

export const getLinks = async (
    fetch: typeof nodeFetch,
    page = 1,
    region: Region,
): Promise<void> => {
    const url = generateUrl({ page, region });
    try {
        const response = await fetch(url);
        const results: RightmoveResponse = await response.json();

        for (const index in results.properties) {
            const property = results.properties[index];
            const html = await getHtml(
                'https://rightmove.co.uk' + property.propertyUrl,
            );
            const $ = cheerio.load(html!);
            const data = {
                propertyId: property.id.toString(),
                title: property.displayAddress,
                summary: property.summary,
                lat: property.location.latitude,
                lon: property.location.longitude,
                keywords: extractKeywords(html!),
                price: property.price.amount,
                bedrooms: property.bedrooms,
                domain: 'https://rightmove.co.uk',
                url: property.propertyUrl,
                region: region.name,
            };

            const propertyModel = new PropertyModel();
            propertyModel.create(data);

            await new Promise((resolve) => setTimeout(() => resolve(), 100));
        }

        if (results.pagination.total !== page) {
            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
            return getLinks(fetch, page + 1, region);
        }
    } catch (error) {
        console.log(page, region, url);
        console.log(error);
    }
};

export const start = async () => {
    for (const index in regions) {
        const region = regions[index];
        console.log(region.name + '\n');
        await getLinks(nodeFetch, 1, region);
    }
};
