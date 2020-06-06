import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { config } from '../config';

import * as Database from 'better-sqlite3';
const db = new Database(config.sqlite.dbpath);
const migration = fs.readFileSync(
    path.join(__dirname, '../../migrate-schema.sql'),
    'utf8',
);
db.exec(migration);

interface Property {
    id: string;
    propertyId: string;
    url: string;
    imageUrl: string;
    title: string;
    keywords: string;
    summary?: string;
    price: number;
    bedrooms: number;
    domain: string;
    lat: number;
    lon: number;
    region: string;
}

export class PropertyModel {
    search(terms: string): Property[] {
        const statement = db.prepare(
            'select * from property where keywords like ?;',
        );
        const properties = statement.all(`%${terms}%`) as Property[];
        return properties;
    }
    create(property: Omit<Property, 'id'>) {
        const insert = db.prepare(
            'INSERT INTO property (id, propertyId, title, summary, lat, lon, keywords, price, bedrooms, domain, url, imageUrl, region) VALUES (:id, :propertyId, :title, :summary, :lat, :lon, :keywords, :price, :bedrooms, :domain, :url, :imageUrl, :region);',
        );
        insert.run({ id: uuid(), ...property });
    }
}
