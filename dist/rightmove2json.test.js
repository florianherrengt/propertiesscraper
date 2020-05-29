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
const rightmove2json_1 = require("./rightmove2json");
describe('rightmove2json', () => {
    test('rightmove2json', () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield rightmove2json_1.rightmove2json();
        console.log(results);
    }));
});
//# sourceMappingURL=rightmove2json.test.js.map