import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    wordText: Yup.string().required('This field is required')
});

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';

export const wordTypeOptions = [
    { value: 'word', label: 'Word' },
    { value: 'sentence', label: 'Sentence' },
    { value: 'phrase', label: 'Phrase' }
];

export type formDataTYPE = {
    wordText: string;
    wordType: wordTypeTYPE;
    definition?: string;
};

export const setInitValues = (isEnDict: boolean): formDataTYPE => {
    return isEnDict ? { wordText: '', wordType: 'word', definition: '' } : { wordText: '', wordType: 'word' };
};

export const setInitErrors = () => {
    return {
        wordText: 'This field is required'
    };
};
