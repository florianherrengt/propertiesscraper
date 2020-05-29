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
const fs = require("fs");
const path = require("path");
const rightmove_1 = require("./rightmove");
const _ = require("lodash");
describe('parsers/rightmove', () => {
    const html = fs.readFileSync(path.join(__dirname, 'rightmove_details.html'), 'utf-8');
    test('parseDetails', () => {
        const results = rightmove_1.parseDetails(html);
        expect(results).toContain('The property is ideally located.');
    });
    test('getLinks', () => __awaiter(void 0, void 0, void 0, function* () {
        const pagination = { total: 3 };
        const mockFetch = jest.fn((url) => new Promise((resolve) => {
            if (url.includes('index=0')) {
                return resolve({
                    json: () => Promise.resolve({
                        properties: _.range(0, 24).map((v) => ({
                            propertyUrl: v,
                        })),
                        pagination,
                    }),
                });
            }
            if (url.includes('index=24')) {
                return resolve({
                    json: () => Promise.resolve({
                        properties: _.range(24, 48).map((v) => ({
                            propertyUrl: v,
                        })),
                        pagination,
                    }),
                });
            }
            if (url.includes('index=48')) {
                return resolve({
                    json: () => Promise.resolve({
                        properties: _.range(48, 50).map((v) => ({
                            propertyUrl: v,
                        })),
                        pagination,
                    }),
                });
            }
        }));
        const results = yield rightmove_1.getLinks(mockFetch);
        expect(results).toHaveLength(50);
        expect(mockFetch).toHaveBeenCalledTimes(3);
    }));
});
//# sourceMappingURL=rightmove.test.js.map