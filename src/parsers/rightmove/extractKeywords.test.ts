import { extractKeywords } from './extractKeywords';
import * as fs from 'fs';
import * as path from 'path';

describe('rightmore/extraKeywords', () => {
    it('should extra the key features and description', () => {
        const keywords = extractKeywords(
            fs.readFileSync(
                path.join(__dirname, '../rightmove_details.html'),
                'utf-8',
            ),
        );
        expect(keywords).toContain('victorian terraced house');
        expect(keywords).toContain('residential road');
        expect(keywords).not.toContain('key features');
        expect(keywords).not.toContain('tenure: freehold');
    });
});
