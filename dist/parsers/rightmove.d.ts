import nodeFetch from 'node-fetch';
export declare const parseDetails: (html: string) => string;
interface Region {
    name: string;
    value: string;
}
export declare const regions: Region[];
export declare const generateUrl: (options: {
    url?: string;
    page: number;
    region: Region;
}) => string;
export declare const getLinks: (fetch: typeof nodeFetch, page: number | undefined, region: Region) => Promise<void>;
export declare const start: () => Promise<void>;
export {};
