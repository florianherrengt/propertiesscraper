import { rightmove2json } from './rightmove2json';

describe('rightmove2json', () => {
    test('rightmove2json', async () => {
        const results = await rightmove2json();
        console.log(results);
    });
});
