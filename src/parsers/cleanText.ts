import * as natural from 'natural';
import { stopwords } from '../helpers/stopwords';

const tokenizer = new natural.TreebankWordTokenizer();

const removeStopWords = (text: string) =>
    tokenizer
        .tokenize(text)
        .filter((token) => !stopwords.includes(token))
        .join(' ');

export const cleanText = (text: string) => {
    text = text.toLowerCase();
    text = text.replace(/\n/gi, '').replace(/\t/gi, '');
    text = removeStopWords(text);
    text = natural.PorterStemmer.stem(text);
    text = removeStopWords(text);
    text = text.replace(/[^a-z0-9\s]/gi, '');
    return text;
};
