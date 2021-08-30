import * as Yup from 'yup';

export const setErrorMes = (code: number, message: string) => 'Error ' + code + '. ' + message;

export const columns = [
    { title: 'EN', value: 'en' },
    { title: 'PL', value: 'pl' },
    // { title: 'Phonetic', value: 'phonetic' },
    { title: 'Definition', value: 'definition', cellSize: 'small' },
    { title: 'Category', value: 'category', cellSize: 'small' },
    { title: 'Word type', value: 'wordType', cellSize: 'small' },
    { title: 'Date', value: 'updatedAt', cellSize: 'small' }
];

export const validationSchema = Yup.object().shape({
    word: Yup.string().required('This field is required')
});

export const setInitValues = (): formDataTYPE => {
    return { word: '', wordType: 'word', definition: '' };
};

export const setInitErrors = () => {
    return {
        word: 'This field is required'
    };
};

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';

export type formDataTYPE = {
    word: string;
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
