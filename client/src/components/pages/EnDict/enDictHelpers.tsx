import * as Yup from 'yup';

export const setErrorMes = (code: number, message: string) => 'Error ' + code + '. ' + message;

export const columns = [
    { title: 'EN', value: 'wordText' },
    { title: 'PL', value: 'translationText' },
    // { title: 'Phonetic', value: 'phonetic' },
    { title: 'Definition', value: 'definition', cellSize: 'small' },
    { title: 'Category', value: 'category', cellSize: 'small' },
    { title: 'Word type', value: 'wordType', cellSize: 'small' },
    { title: 'Date', value: 'updatedAt', cellSize: 'small' }
];

export const validationSchema = Yup.object().shape({
    wordText: Yup.string().required('This field is required')
});

export const setInitValues = (): formDataTYPE => {
    return { wordText: '', wordType: 'word', definition: '' };
};

export const setInitErrors = () => {
    return {
        wordText: 'This field is required'
    };
};

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';

export type formDataTYPE = {
    wordText: string;
    wordType: wordTypeTYPE;
    definition?: string;
};

export type googleTranslateWordDataDefinitionTYPE = {
    definition: string;
    example: string;
    synonyms: string[] | [];
    antonyms: string[] | [];
};
export type googleTranslateWordDataTYPE = {
    partOfSpeech: string;
    definitions: googleTranslateWordDataDefinitionTYPE[];
};
