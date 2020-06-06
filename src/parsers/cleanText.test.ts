import { cleanText } from './cleanText';

describe('CleanText', () => {
    it('should remove plurial', () => {
        expect(cleanText('dogs')).toEqual('dog');
    });
    it('should stop words', () => {
        expect(cleanText('the dog becomes nice')).toEqual('dog nic');
    });
});
