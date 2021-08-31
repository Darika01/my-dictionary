import * as Yup from 'yup';

export const setErrorMes = (code: number, message: string) => 'Error ' + code + '. ' + message;

export const columns = [
    { title: 'PL', value: 'wordText' },
    { title: 'RU', value: 'translationText' },
    { title: 'Word type', value: 'wordType', cellSize: 'small' },
    { title: 'Date', value: 'updatedAt', cellSize: 'small' }
];

export const validationSchema = Yup.object().shape({
    wordText: Yup.string().required('This field is required')
});

export const setInitValues = (): formDataTYPE => {
    return { wordText: '', wordType: 'word' };
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
};
